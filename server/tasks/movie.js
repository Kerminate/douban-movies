const cp = require('child_process')
const path = require('path')
const mongoose = require('mongoose')

const movieTask = async () => {
  const Movie = mongoose.model('Movie')
  const script = path.resolve(__dirname, '../crawler/trailer-list.js')
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

  child.on('message', data => {
    let result = data.result
    result.forEach(async (item) => {
      let movie = await Movie.findOne({
        doubanId: item.doubanId
      })

      if (!movie) {
        movie = new Movie(item)
        await movie.save()
      }
    })
  })

}

module.exports = movieTask