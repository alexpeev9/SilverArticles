import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.use('/api', (req: any, res: any) =>
  res.json({ status: mongoose.connection.readyState })
);

router.use('*', (req: any, res: any) => res.json({ status: 200 }));

export default router;
