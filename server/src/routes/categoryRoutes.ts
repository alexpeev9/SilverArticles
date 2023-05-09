import { Router } from 'express'

import categoryController from '../controllers/categoryController'
import tokenMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.route('/').get(categoryController.getAll)
router.route('/create').post(tokenMiddleware, categoryController.create)
router.route('/update/:slug').put(tokenMiddleware, categoryController.update)
router.route('/get/:number/').get(categoryController.getXNumber)
router.route('/:slug').get(categoryController.getOne)

export default router
