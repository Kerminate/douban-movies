const path = require('path')
const { Route } = require('../lib/decorator')

export const router = app => {
  const apiPath = path.resolve(__dirname, '../routes')
  const router = new Route(app, apiPath)

  router.init()
}