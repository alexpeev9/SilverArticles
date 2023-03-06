import { Request, Response, NextFunction } from 'express'
import userService from '../services/userService'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAll()
    return res.status(200).json({
      users
    })
  } catch (err: any) {
    return next(err)
  }
}

export default { getAll }
