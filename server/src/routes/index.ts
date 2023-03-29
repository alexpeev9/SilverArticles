import { Router, Request, Response } from 'express'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import categoryRoutes from './categoryRoutes'
import articleRoutes from './articleRoutes'

const router = Router()

router.use('/api/auth', authRoutes)
router.use('/api/users', userRoutes)
router.use('/api/categories', categoryRoutes)
router.use('/api/articles', articleRoutes)

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
