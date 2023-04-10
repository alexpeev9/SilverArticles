import { Request, Response, NextFunction } from 'express'

import IUser from '../interfaces/entities/IUser'
import authService from '../services/authService'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: IUser = req.body
    const userId = await authService.register(data)
    return res.status(200).json(userId)
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
      expires: new Date(new Date().setDate(new Date().getDate() + 7)) // 7 days
      // maxAge: 60 * 1000 // 1 minute for testing
    })
    return res.status(200).json(token)
  } catch (err: any) {
    return next(err)
  }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('token')
    return res.status(200).json({
      success: true
    })
  } catch (err: any) {
    return next(err)
  }
}

const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['token'] || null
    return res.status(200).json(token)
  } catch (err: any) {
    res.clearCookie('token')
    return res.status(401).json({ errors: ['You are not logged. Please log'] })
  }
}

export default { register, login, logout, verify }
