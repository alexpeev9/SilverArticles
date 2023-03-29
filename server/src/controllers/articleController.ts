import { Request, Response, NextFunction } from 'express'
import articleService from '../services/articleService'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await articleService.getAll()
    return res.status(200).json(articles)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const getArticleBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const article = await articleService.getArticleBySlug(slug)
    return res.status(200).json(article)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

export default { getAll, getArticleBySlug }
