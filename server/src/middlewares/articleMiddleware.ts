import { Request, Response, NextFunction } from 'express'
import { roleIds } from '../env'
import articleService from '../services/articleService'

const accessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const { reqToken } = req.body

    const currentUser = { username: reqToken.username, roleId: reqToken.roleId }
    const article = await articleService.getOne(slug)

    // check if the requester of the info is the author or administrator
    if (!articleService.checkIfCreator(article, currentUser)) {
      throw new Error('Article Not Found!')
    }

    req.body.article = article
    next()
  } catch (err: any) {
    return res.status(403).json({
      errors: [`${err.message}`]
    })
  }
}

export { accessMiddleware }
