import { Router } from 'express'

import articleController from '../controllers/articleController'
import authMiddleware from '../middlewares/authMiddleware'
import { accessMiddleware } from '../middlewares/articleMiddleware'

const router = Router()

router.route('/').get(articleController.getAll)
router.route('/create').post(authMiddleware, articleController.create)
router
  .route('/update/:slug')
  .put(authMiddleware, accessMiddleware, articleController.update)
router
  .route('/remove/:slug')
  .delete(authMiddleware, accessMiddleware, articleController.remove)
router.route('/get/:number/:order').get(articleController.getXNumber)
router.route('/:slug').get(articleController.getOne)

export default router
