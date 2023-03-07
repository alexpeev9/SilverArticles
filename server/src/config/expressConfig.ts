import express, { Express } from 'express'
import cors from 'cors'

import { clientUrl } from '../env'
import router from '../routes'
import errorMiddleware from '../middlewares/errorMiddleware'

function expressConfig(app: Express) {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(
    cors({
      credentials: true,
      origin: [clientUrl]
    })
  )

  app.use('/', router)
  app.use(errorMiddleware)
}

export default expressConfig
