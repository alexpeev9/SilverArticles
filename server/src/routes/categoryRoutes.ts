import { Router } from 'express'

import categoryController from '../controllers/categoryController'
import {
  getUserMiddleware,
  checkUserMiddleware
} from '../middlewares/authMiddleware'
import { adminMiddleware } from '../middlewares/roleMiddleware'

const router = Router()

router.route('/').get(categoryController.getAll)
router
  .route('/create')
  .post(
    getUserMiddleware,
    checkUserMiddleware,
    adminMiddleware,
    categoryController.create
  )
router
  .route('/update/:slug')
  .put(
    getUserMiddleware,
    checkUserMiddleware,
    adminMiddleware,
    categoryController.update
  )
router
  .route('/remove/:slug')
  .delete(
    getUserMiddleware,
    checkUserMiddleware,
    adminMiddleware,
    categoryController.remove
  )
router.route('/get/:number/').get(categoryController.getXNumber)
router.route('/:slug').get(categoryController.getOne)

export default router
