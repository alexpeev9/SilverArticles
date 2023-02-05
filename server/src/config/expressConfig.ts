import express, { Express } from 'express';
import cors from 'cors';

import env from '../env';
import router from '../routes';

function expressConfig(app: Express) {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    cors({
      origin: [`${env.clientUrl}`],
      credentials: true
    })
  );

  app.use('/', router);
}

export default expressConfig;
