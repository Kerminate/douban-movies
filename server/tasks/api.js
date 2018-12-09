// http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native')

const fetchMovie = async (item) => {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const res = await rp(url)
  return res
}

;(async () => {
  const movies = [
    { doubanId: 30330688,
      title: '拯救圣诞记',
      rate: 6.8,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2536607303.jpg' },
    { doubanId: 26348846,
      title: '罗宾汉',
      rate: 5.5,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2521073240.jpg' }
  ]

  movies.map(async (movie) => {
    let movieData = await fetchMovie(movie)

    try {
      movieData = JSON.parse(movieData)
      console.log(movieData.tags)
      console.log(movieData.summary)
    } catch (err) {
      console.log(err)
    }
  })
})()