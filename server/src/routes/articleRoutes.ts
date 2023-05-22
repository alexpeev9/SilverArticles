import { Router } from 'express'

import articleController from '../controllers/articleController'
import {
  getUserMiddleware,
  accessMiddleware,
  checkUserMiddleware
} from '../middlewares/authMiddleware'

const router = Router()

router.route('/').get(articleController.getAll)
router
  .route('/create')
  .post(getUserMiddleware, checkUserMiddleware, articleController.create)
router
  .route('/update/:slug')
  .put(
    getUserMiddleware,
    checkUserMiddleware,
    accessMiddleware,
    articleController.update
  )
router
  .route('/remove/:slug')
  .delete(
    getUserMiddleware,
    checkUserMiddleware,
    accessMiddleware,
    articleController.remove
  )
router.route('/get/:number/:order').get(articleController.getXNumber)
router
  .route('/vote/:slug')
  .post(getUserMiddleware, checkUserMiddleware, articleController.vote)
router.route('/:slug').get(getUserMiddleware, articleController.getOne)
export default router
