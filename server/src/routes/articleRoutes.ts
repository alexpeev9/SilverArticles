import { Router } from 'express'

import articleController from '../controllers/articleController'
import {
  accessMiddleware,
  loggedMiddleware
} from '../middlewares/authMiddleware'

const router = Router()

router.route('/').get(articleController.getAll)
router.route('/create').post(loggedMiddleware, articleController.create)
router
  .route('/update/:slug')
  .put(loggedMiddleware, accessMiddleware, articleController.update)
router
  .route('/remove/:slug')
  .delete(loggedMiddleware, accessMiddleware, articleController.remove)
router.route('/get/:number/:order').get(articleController.getXNumber)
router.route('/vote/:slug').post(loggedMiddleware, articleController.vote)
router.route('/:slug').get(articleController.getOne)
export default router
