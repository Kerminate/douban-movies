const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const app = new Koa()

app.use(serve(path.resolve(__dirname, './')))

app.listen(3000, () => {
  console.log('server is running at local:3000')
})