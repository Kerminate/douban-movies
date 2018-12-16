const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const { connect } = require('./database/init')

const app = new Koa()

;(async () => {
  await connect()
})()

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