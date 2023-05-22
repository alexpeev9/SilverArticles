import { Router } from 'express'
import {
  getUserMiddleware,
  checkUserMiddleware
} from '../middlewares/authMiddleware'
import { adminMiddleware } from '../middlewares/roleMiddleware'

import userController from '../controllers/userController'

const router = Router()

router
  .route('/')
  .get(
    getUserMiddleware,
    checkUserMiddleware,
    adminMiddleware,
    userController.getAll
  )
router.route('/:username').get(userController.getUser)

export default router
