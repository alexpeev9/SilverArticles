import { Router, Request, Response } from 'express'
import authRoutes from './authRoutes'

const router = Router()

router.use('/api/auth', authRoutes)

router.get('/find', async (req: Request, res: Response) => {
  try {
    res.json({ status: 200 })
  } catch (e: any) {
    res.json({ status: e.message })
  }
})

router.use('*', (req: Request, res: Response) => {
  res.json({ status: 404 })
})

export default router
