import { Router, Request, Response } from 'express';
import testMiddleware from '../middlewares/testMiddleware';
import test2MIddleware from '../middlewares/test2MIddleware';

import User from '../models/User';

const router = Router();

router.use('/create/:username', async (req: Request, res: Response) => {
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

router.get(
  '/find',
  test2MIddleware,
  testMiddleware,
  async (req: Request, res: Response) => {
    try {
      const data = await User.find({
        username: 'test1'
      });
      res.json({ status: data });
    } catch (e: any) {
      res.json({ status: e.message });
    }
  }
);

router.use('*', (req: Request, res: Response) => {
  res.json({ status: 404 });
});

export default router;
