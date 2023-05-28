import { Request, Response, NextFunction } from 'express'

import authService from '../services/authService'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: any = req.body

    await authService.register(data)

    const token = await authService.login(data.username, data.password)
    res.cookie('token', token, {
      sameSite: 'none',
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

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body
    const token = await authService.login(username, password)
    res.cookie('token', token, {
      sameSite: 'none',
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
    return res.status(200).json(true)
  } catch (err: any) {
    return next(err)
  }
}

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params
    const { reqUser: currentUser } = req.body
    const user = await authService.getProfile(username, currentUser)
    return res.status(200).json(user)
  } catch (err: any) {
    err.statusCode = 404
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

export default { register, login, logout, getProfile, verify }
