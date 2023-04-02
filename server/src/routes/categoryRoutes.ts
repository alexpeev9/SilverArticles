import { Router } from 'express'

import categoryController from '../controllers/categoryController'
import { adminMiddleware } from '../middlewares/roleMiddleware'

const router = Router()

router.route('/').get(categoryController.getAll)
router.route('/get/:number/').get(categoryController.getXNumberArticles)
router.route('/:slug').get(categoryController.getCategoryBySlug)
router.route('/:slug').put(categoryController.updateCategory)

export default router
