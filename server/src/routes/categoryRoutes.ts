import { Router } from 'express'

import categoryController from '../controllers/categoryController'
import { adminMiddleware } from '../middlewares/roleMiddleware'

const router = Router()

router.route('/').get(categoryController.getAll)
router.route('/get/:number/').get(categoryController.getXNumber)
router.route('/:slug').get(categoryController.getOne)
router.route('/:slug').put(categoryController.update)

export default router
