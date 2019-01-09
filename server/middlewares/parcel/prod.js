const views = require('koa-views')
const serve = require('koa-static')
const path = require('path')

const r = pathDir => path.resolve(__dirname, pathDir)

export const dev = async app => {
  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })

  app.use(async (ctx) => {
    await ctx.render('index.html')
  })
}