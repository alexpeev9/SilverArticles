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

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const token = await authService.login(email, password)
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      // expires: new Date(new Date().setDate(new Date().getDate() + 7)) // 7 days
      maxAge: 60 * 1000 // 1 minute
    })
    return res.status(200).json({
      token
    })
  } catch (err: any) {
    return next(err)
  }
}

export default { register, login }
