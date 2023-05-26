import { Request, Response, NextFunction } from 'express'
import userService from '../services/userService'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAll()
    return res.status(200).json(users)
  } catch (err: any) {
    return next(err)
  }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params
    const { reqUser: currentUser } = req.body
    const user = await userService.getProfile(username, currentUser)
    return res.status(200).json(user)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

export default { getAll, getUser }
