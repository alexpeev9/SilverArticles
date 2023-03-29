import { Router } from 'express'

import articleController from '../controllers/articleController'
import { adminMiddleware } from '../middlewares/roleMiddleware'

const router = Router()

router.route('/').get(articleController.getAll)
router.route('/:slug').get(articleController.getArticleBySlug)

export default router
