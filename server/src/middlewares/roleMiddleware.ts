import { Request, Response, NextFunction } from 'express'
import roleService from '../services/roleService'

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await roleMiddleware(req, res, next, 'Admin')
}

const moderatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await roleMiddleware(req, res, next, 'Moderator')
}

const writerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await roleMiddleware(req, res, next, 'Writer')
}

const roleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
  roleTitle: string
) => {
  const data: IToken = req.body.reqToken

  const role = await roleService.find(data.roleId)
  if (!role) {
    throw new Error('Role not found')
  }

  if (role?.title !== roleTitle) {
    res.clearCookie('token')
    throw new Error('You are not authorized!')
  }
  return next()
}

export { adminMiddleware, moderatorMiddleware, writerMiddleware }
