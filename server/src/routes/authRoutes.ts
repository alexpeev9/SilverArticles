import { Router } from 'express'

import { getUserMiddleware } from '../middlewares/authMiddleware'
import authController from '../controllers/authController'

const router = Router()

router.route('/register').post(authController.register)
router.route('/login').post(authController.login)
router.route('/logout').post(authController.logout)
router.route('/verify').get(authController.verify)
router.route('/:username').get(getUserMiddleware, authController.getProfile)

export default router
