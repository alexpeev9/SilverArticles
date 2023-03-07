import { Router } from 'express'
import tokenMiddleware from '../middlewares/tokenMiddleware'
import { adminMiddleware } from '../middlewares/roleMiddleware'

import userController from '../controllers/userController'

const router = Router()

router.route('/').get(tokenMiddleware, adminMiddleware, userController.getAll)

export default router
