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
  try {
    const data: IToken = req.body.reqToken

    const role = await roleService.find(data.roleId)

    if (role?.title !== roleTitle) {
      res.clearCookie('token')
      throw new Error()
    }

    if (role) {
      return next()
    }
  } catch (err: any) {
    return res.status(403).json({
      errors: [`You are not authorized. ${roleTitle}s can access the feature`]
    })
  }
}

export { adminMiddleware, moderatorMiddleware, writerMiddleware }
