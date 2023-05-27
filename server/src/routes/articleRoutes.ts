import { Router } from 'express'

import articleController from '../controllers/articleController'
import {
  getUserMiddleware,
  accessMiddleware,
  checkUserMiddleware
} from '../middlewares/authMiddleware'

import { moderatorMiddleware } from '../middlewares/roleMiddleware'

const router = Router()

router
  .route('/')
  .get(
    getUserMiddleware,
    checkUserMiddleware,
    moderatorMiddleware,
    articleController.getAll
  )

router
  .route('/')
  .post(getUserMiddleware, checkUserMiddleware, articleController.create)

router.route('/get/:number/:order').get(articleController.getXNumber)

router.route('/:slug').get(getUserMiddleware, articleController.getOne)

router
  .route('/:slug')
  .put(
    getUserMiddleware,
    checkUserMiddleware,
    accessMiddleware,
    articleController.update
  )

router
  .route('/:slug')
  .patch(getUserMiddleware, checkUserMiddleware, articleController.vote)

router
  .route('/:slug')
  .delete(
    getUserMiddleware,
    checkUserMiddleware,
    accessMiddleware,
    articleController.remove
  )

export default router
