import { Router } from 'express'

import articleController from '../controllers/articleController'
import { adminMiddleware } from '../middlewares/roleMiddleware'
import tokenMiddleware from '../middlewares/tokenMiddleware'

const router = Router()

router.route('/').get(articleController.getAll)
router.route('/create').post(tokenMiddleware, articleController.create)
router.route('/get/:number/:order').get(articleController.getXNumberArticles)
router.route('/:slug').get(articleController.getArticleBySlug)

export default router
