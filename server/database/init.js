const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-trailer'
// 使用 node 原生的 Promise 代替 mongoose 内部实现的 Promise
mongoose.Promise = global.Promise

exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    
    mongoose.connect(db)
    
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 3) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年！')
      }
    })
    
    mongoose.connection.on('error', (err) => {
      reject(err)
      console.log(err)
    })
    
    mongoose.connection.once('open', () => {
      resolve()
      console.log('MongoDB Connected Successfully!')
    })
  })
}