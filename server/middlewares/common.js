const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')

export const addBodyParser = app => {
  app.use(bodyParser())
}

export const addLogger = app => {
  app.use(logger())
}

export const addSession = app => {
  app.keys = ['kpl-trailer']

  const CONFIG = {
    key: 'koa:sess',
    maxAge: 864000,
    overwrite: true,
    httpOnly: false,
    signed: true,
    rolling: false
  }

  app.use(session(CONFIG, app))
}