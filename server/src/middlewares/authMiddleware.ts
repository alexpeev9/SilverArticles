import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { jwtSecret } from '../env'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
    return res.status(401).json({ errors: ['You are not logged. Please log'] })
  }
}

export default authMiddleware
