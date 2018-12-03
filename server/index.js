const Koa = require('koa')
const views = require('koa-views')
const path = require('path')

const app = new Koa()

// const ejs = require('ejs')
// const pug = require('pug')
// const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')

// app.use(async (ctx, next) => {
//   ctx.type = 'text/html; charset=utf-8'
//   ctx.body = pug.render(pugTpl, {
//     you: 'KPL',
//     me: 'Kerminate'
//   })
// })

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