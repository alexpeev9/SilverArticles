import { Router } from 'express'

import authController from '../controllers/authController'

const router = Router()

router.route('/register').post(authController.register)
router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout)

export default router
