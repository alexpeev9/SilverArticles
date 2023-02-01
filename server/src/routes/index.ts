import { Router } from 'express';
import path from 'path';
import mongoose from 'mongoose';

const router = Router();

router.use('/api', (req: any, res: any) =>
  res.json({ status: mongoose.connection.readyState })
);

router.use('*', (req: any, res: any) => {
  return res.sendFile(
    path.join(__dirname, '../../../', '/client/build/index.html')
  );
});

export default router;
