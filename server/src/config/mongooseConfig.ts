import { Express } from 'express';
import mongoose from 'mongoose';

import env from '../env';

function mongooseConfig(app: Express) {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(env.connectionString)
    .then(() =>
      app.listen(env.apiPort, () =>
        console.log(`Server is running on port ${env.apiPort}`)
      )
    )
    .catch((err) => {
      console.log('Cannot connect to database.', err);
    });
}

export default mongooseConfig;
