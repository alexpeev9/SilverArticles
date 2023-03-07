import { Express } from 'express'
import mongoose from 'mongoose'

import { connectionString, apiPort } from '../env'

function mongooseConfig(app: Express) {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(connectionString)
    .then(() =>
      app.listen(apiPort, () =>
        console.log(`Server is running on port ${apiPort}`)
      )
    )
    .catch((err) => {
      console.log('Cannot connect to database.', err)
    })
}

export default mongooseConfig
