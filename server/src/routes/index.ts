import { Router, Request, Response } from 'express';

const router = Router();

router.get('/find', async (req: Request, res: Response) => {
  try {
    res.json({ status: 200 });
  } catch (e: any) {
    res.json({ status: e.message });
  }
});

router.use('*', (req: Request, res: Response) => {
  res.json({ status: 404 });
});

export default router;
