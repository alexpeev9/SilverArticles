import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import env from '../env'

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token']

  if (token) {
    try {
      req.body.reqToken = jwt.verify(token, env.jwtSecret)
      return next()
    } catch (e) {
      res.clearCookie('token')
      return res.status(401).json('Unauthorized!')
    }
  }
  return res.status(401).json('You must be logged!')
}

export default tokenMiddleware
