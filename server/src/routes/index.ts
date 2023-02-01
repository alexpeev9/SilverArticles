import { Router } from 'express';
import path from 'path';

const router = Router();

router.use('/api', (req: any, res: any) => res.json({ status: 200 }));

router.use('/*', (req: any, res: any) => res.json({ status: 200 }));

// router.use('*', (req: any, res: any) => {
//   return res.sendFile(
//     path.join(__dirname, '../../../', '/client/build/index.html')
//   );
// });

export default router;
