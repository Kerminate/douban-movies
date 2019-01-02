const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const mongoose = require('mongoose')
const { connect, initSchemas, initAdmin } = require('./database/init')
const router = require('./routes')

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
})()

const app = new Koa()

app.use(views(path.resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'James',
    me: 'Kerminate'
  })
})

app.listen(3000, () => {
  console.log('server is running at local:3000')
})