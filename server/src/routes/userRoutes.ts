import { Router } from 'express'
import { loggedMiddleware } from '../middlewares/authMiddleware'
import { adminMiddleware } from '../middlewares/roleMiddleware'

import userController from '../controllers/userController'

const router = Router()

router.route('/').get(loggedMiddleware, adminMiddleware, userController.getAll)
router.route('/:username').get(userController.getUser)

export default router
