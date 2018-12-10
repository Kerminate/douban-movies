const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  const movies = [{  
    doubanId: 26954268,
    title: '道高一丈',
    rate: 5,
    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2530863118.jpg',
    video: 'http://vt1.doubanio.com/201812091843/88aafd3ce0723fb5e5fce4e1f36ce1e8/view/movie/M/402360009.mp4',
    cover: 'https://img3.doubanio.com/img/trailer/medium/2533378686.jpg?' 
  }]

  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('开始传 video')
        const videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始传 cover')
        const coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
        console.log('开始传 poster')
        const posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')

        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }

        console.log(movie)
      } catch (err) {
        console.log(err)
      }
    }
  })
})()