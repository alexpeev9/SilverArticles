import express, { Express } from 'express'
import cors from 'cors'

import env from '../env'
import router from '../routes'
import errorMiddleware from '../middlewares/errorMiddleware'

function expressConfig(app: Express) {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(
    cors({
      origin: [env.clientUrl],
      credentials: true
    })
  )

  app.use('/', router)
  app.use(errorMiddleware)
}

export default expressConfig
