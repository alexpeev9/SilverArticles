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
  const token = req.cookies['token']

  if (token) {
    try {
      const data: IToken = req.body.reqToken

      const role = await roleService.findById(data.roleId)

      if (role?.title === roleTitle) {
        return next()
      }

      return res.status(401).json({ ok: false, message: 'Not Administrator!' })
    } catch (e) {
      res.clearCookie('token')
      return res.status(401).json({ ok: false, message: 'Unauthorized!' })
    }
  }
  return res.status(401).json({ ok: false, message: 'You must be logged!' })
}

export { adminMiddleware, moderatorMiddleware, writerMiddleware }
