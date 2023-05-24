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
    const { reqUser } = req.body
    const role = await roleService.find(reqUser.role._id)

    if (role.title !== roleTitle) {
      res.clearCookie('token')
      throw new Error(
        `You are not authorized. ${role.title}s can access this feature.`
      )
    }

    return next()
  } catch (err: any) {
    return res.status(403).json({
      errors: [`${err.message}`]
    })
  }
}

export { adminMiddleware, moderatorMiddleware, writerMiddleware }
