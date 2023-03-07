import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { jwtSecret } from '../env'

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['token']
    if (token) {
      req.body.reqToken = jwt.verify(token, jwtSecret)
      return next()
    } else {
      return res.status(401).json('You must be logged!')
    }
  } catch (e) {
    res.clearCookie('token')
    return res.status(401).json('Unauthorized!')
  }
}

export default tokenMiddleware
