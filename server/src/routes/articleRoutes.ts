import { Router } from 'express'

import articleController from '../controllers/articleController'
import tokenMiddleware from '../middlewares/tokenMiddleware'

const router = Router()

router.route('/').get(articleController.getAll)
router.route('/create').post(tokenMiddleware, articleController.create)
router.route('/update/:slug').put(tokenMiddleware, articleController.update)
router.route('/remove/:slug').delete(articleController.remove)
router.route('/get/:number/:order').get(articleController.getXNumber)
router.route('/:slug').get(articleController.getOne)

export default router
