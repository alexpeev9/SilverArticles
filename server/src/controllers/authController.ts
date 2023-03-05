import { Request, Response, NextFunction } from 'express'

import IUser from '../interfaces/entities/IUser'
import authService from '../services/authService'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: IUser = req.body
    const userId = await authService.register(data)
    return res.status(200).json({
      userId
    })
  } catch (err: any) {
    return next(err)
  }
}

export default { register }
