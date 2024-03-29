import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import articleService from '../services/articleService'
import authService from '../services/authService'

import { jwtSecret } from '../env'

const getUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies['token']
    if (token) {
      const tokenData = jwt.verify(token, jwtSecret) as any
      if (tokenData) {
        req.body.reqUser = await authService.getEntity(tokenData.username)
      }
    }
    return next()
  } catch (err: any) {
    return res.status(404).json({ errors: ['An error ocurred!'] })
  }
}

const checkUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reqUser } = req.body
    if (!reqUser) {
      res.clearCookie('token')
      throw new Error('You must be logged!')
    }
    return next()
  } catch (err: any) {
    return res.status(401).json({ errors: [`${err.message}`] })
  }
}

const accessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const { reqUser } = req.body

    const article = await articleService.getOne(slug)

    // check if the requester of the info is the author or administrator
    if (!articleService.checkIfAuthorized(article, reqUser)) {
      throw new Error('You are not authorized to modify this.')
    }

    req.body.article = article
    next()
  } catch (err: any) {
    return res.status(403).json({
      errors: [`${err.message}`]
    })
  }
}

export { getUserMiddleware, checkUserMiddleware, accessMiddleware }
