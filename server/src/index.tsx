import express from 'express';
import cors from 'cors';

import router from './routes';

const app = express();

app.use(
  cors({
    origin: true, // TODO: Fix it
    credentials: true,
    optionsSuccessStatus: 200
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

app.listen(5000, () => console.log(`Server is running on port 5000`));
