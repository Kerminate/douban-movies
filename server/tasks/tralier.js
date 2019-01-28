const cp = require('child_process')
const path = require('path')
const mongoose = require('mongoose')

const tralierTask = async () => {
  const Movie = mongoose.model('Movie')
  const Category = mongoose.model('Category')

  let movies = await Movie.find({
    $or: [
      { video: { $exists: false } },
      { video: null }
    ]
  }).exec()

  const script = path.resolve(__dirname, '../crawler/video.js')
  const child = cp.fork(script, [])
  let invoked = false

  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true
    const err = code === 0 ? null : new Error('exit code ' + code)
    console.log(err)
  })

  child.on('message', async (data) => {
    console.log(data)
    const doubanId = data.doubanId
    const movie = await Movie.findOne({
      doubanId: doubanId
    }).exec()

    if (data.video) {
      movie.video = data.video
      movie.cover = data.cover
      await movie.save()
    } else {
      await movie.remove()

      const movieTypes = movie.movieTypes
      for (let i = 0; i < movieTypes.length; i++) {
        const type = movieTypes[i]
        const cat = Category.findOne({
          name: type
        })

        if (cat && cat.movies) {
          const idx = cat.movies.indexOf(movie._id)
          if (idx > - 1) {
            cat.movies = cat.movies.splice(idx, 1)
          }

          await cat.save()
        }
      }
    }
  })

  console.log(movies)

  child.send(movies)

}

module.exports = tralierTask