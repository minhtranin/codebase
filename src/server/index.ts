/* tslint:disable:no-console */

import * as express from 'express'
import * as session from 'express-session'
import * as proxy from 'http-proxy-middleware'
import ms from 'ms'

import { GraphQLServer } from './graphqlServer'

async function startServer () {
  const app = express()

  app.get('/', (req, res, next) => {
    req.url = req.originalUrl = '/public/static/index.html'
    next()
  })

  app.use(session({
    cookie: {
      httpOnly: true,
      maxAge: ms(process.env.AUTH_SESSION_MAX_AGE || ''),
      secure: process.env.AUTH_SESSION_SECURE === 'true'
    },
    name: 'id',
    resave: false,
    saveUninitialized: false,
    secret: process.env.AUTH_SESSION_SECRET || '',
    unset: 'destroy'
  }))

  const graphQLserver = new GraphQLServer()
  graphQLserver.applyMiddleware(app)

  if (process.env.DEV_MODE) {
    app.use(proxy('/public', {
      target: `http://${process.env.DEV_MODE_HOST}:${process.env.DEV_MODE_PORT}/`,
      ws: true
    }))
  } else {
    app.use('/public/', express.static('dist/web'))
  }

  if (process.env.STORAGE_TYPE === 'local') {
    app.use('/storage', express.static('tmp/storage'))
  }

  // XXX: working but a bit hacky, consider using express-history-api-fallback
  app.get('*', (req, res) => {
    req.url = req.originalUrl = '/'
    app.handle(req, res)
  })

  const port = process.env.SERVER_HTTP_PORT
  app.listen(port, () => console.log(`Listening on port ${port}.`))
}

// tslint:disable-next-line:no-floating-promises
startServer()
