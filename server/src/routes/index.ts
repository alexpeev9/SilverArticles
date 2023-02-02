import { Router } from 'express';

import User from '../models/User';

const router = Router();

router.use('/create/:username', async (req: any, res: any) => {
  try {
    const { username } = req.params;
    const data = await User.create({
      username
    });
    res.json({ status: data });
  } catch (e: any) {
    res.json({ status: e.message });
  }
});

router.use('/find', async (req: any, res: any) => {
  try {
    const data = await User.find({
      username: 'test1'
    });
    res.json({ status: data });
  } catch (e: any) {
    res.json({ status: e.message });
  }
});

router.use('*', (req: any, res: any) => {
  res.json({ status: 404 });
});

export default router;
