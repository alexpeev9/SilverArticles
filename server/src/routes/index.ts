import { Router } from 'express';

const router = Router();

router.use('/api', (req: any, res: any) => res.json({ status: 200 }));

router.use('*', (req: any, res: any) => res.json({ status: 200 }));

export default router;
