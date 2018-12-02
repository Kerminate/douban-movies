const Koa = require('koa')

const app = new Koa()
app.use(async (ctx, next) => {
  ctx.body = 'hello'
})

app.listen(3000, () => {
  console.log('server is running at local:3000')
})