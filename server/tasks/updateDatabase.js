const { connect, initSchemas, initAdmin } = require('../database/init')
const clearTask = require('./clear')
const movieTask = require('./movie')
const apiTask = require('./api')
const tralierTask = require('./tralier')
const qiniuTask = require('./qiniu')

;(async () => {
  // 连接数据库
  await connect()

  console.log('connect')

  // 初始化数据表
  initSchemas()

  await initAdmin()

  console.log('init')
  // await clearTask()
  // await movieTask()
  // await apiTask()
  // await tralierTask()
  // await qiniuTask()
})()