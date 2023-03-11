import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { jwtSecret } from '../env'

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token']
  if (token) {
    req.body.reqToken = jwt.verify(token, jwtSecret)
    return next()
  } else {
    res.clearCookie('token')
    throw new Error('You must be logged!')
  }
}

export default tokenMiddleware
