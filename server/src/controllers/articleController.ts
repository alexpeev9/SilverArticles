import { Request, Response, NextFunction } from 'express'
import articleService from '../services/articleService'
import IArticle from '../interfaces/entities/IArticle'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await articleService.getAll()
    return res.status(200).json(articles)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const getXNumberArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { number, order } = req.params
    const articles = await articleService.getXNumberArticles(number, order)
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
    const token = req.cookies['token']
    const article = await articleService.getArticleBySlug(slug, token)
    return res.status(200).json(article)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    const articleSlug = await articleService.create(data)
    return res.status(200).json(articleSlug)
  } catch (err: any) {
    return next(err)
  }
}

export default { getAll, create, getXNumberArticles, getArticleBySlug }
