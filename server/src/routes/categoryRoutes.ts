import { Router } from 'express'

import categoryController from '../controllers/categoryController'
import {
  getUserMiddleware,
  checkUserMiddleware
} from '../middlewares/authMiddleware'
import { moderatorMiddleware } from '../middlewares/roleMiddleware'

const router = Router()

router.route('/').get(categoryController.getAll)
router
  .route('/create')
  .post(
    getUserMiddleware,
    checkUserMiddleware,
    moderatorMiddleware,
    categoryController.create
  )
router
  .route('/update/:slug')
  .put(
    getUserMiddleware,
    checkUserMiddleware,
    moderatorMiddleware,
    categoryController.update
  )
router.route('/get/:number/').get(categoryController.getXNumber)
router.route('/:slug').get(categoryController.getOne)

export default router
