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

router.use('*', (req: Request, res: Response) => {
  res.status(404).json(['Not Found!'])
})

export default router
