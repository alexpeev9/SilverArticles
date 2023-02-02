import express from 'express';
import mongoose from 'mongoose';

import router from './routes';
import env from './env';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

mongoose.set('strictQuery', false);
mongoose
  .connect(env.connectionString)
  .then(() =>
    app.listen(5000, () => console.log(`Server is running on port 5000`))
  )
  .catch((err) => {
    console.log('Cannot connect to database.', err);
  });
