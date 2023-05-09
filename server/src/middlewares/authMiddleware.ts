import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import articleService from '../services/articleService'
import { jwtSecret } from '../env'

const loggedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['token']
    if (token) {
      req.body.reqToken = jwt.verify(token, jwtSecret)
      return next()
    } else {
      res.clearCookie('token')
      throw new Error('You must be logged!')
    }
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
    const { reqToken } = req.body

    const currentUser = { username: reqToken.username, roleId: reqToken.roleId }
    const article = await articleService.getOne(slug)

    // check if the requester of the info is the author or administrator
    if (!articleService.checkIfCreator(article, currentUser)) {
      throw new Error('You must be logged!')
    }

    req.body.article = article
    next()
  } catch (err: any) {
    return res.status(403).json({
      errors: [`${err.message}`]
    })
  }
}

export { loggedMiddleware, accessMiddleware }
