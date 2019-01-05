const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const mongoose = require('mongoose')
const R = require('ramda')
const { connect, initSchemas, initAdmin } = require('./database/init')

const MIDDLEWARES = ['router']

// 加载中间件
const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => path.resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () => {
  // 连接数据库
  await connect()

  // 初始化数据表
  initSchemas()

  await initAdmin()

  // require('./tasks/movie')
  // require('./tasks/api')
  // require('./tasks/tralier')
  // require('./tasks/qiniu')

  const app = new Koa()
  await useMiddlewares(app)

  app.listen(3000, () => {
    console.log('server is running at local:3000')
  })
})()