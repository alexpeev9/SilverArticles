import { Request, Response, NextFunction } from 'express'
import categoryService from '../services/categoryService'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAll()
    return res.status(200).json(categories)
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
    const { number } = req.params
    const articles = await categoryService.getXNumberCategories(number)
    return res.status(200).json(articles)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const getCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const category = await categoryService.getCategoryBySlug(slug)
    return res.status(200).json(category)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const { body } = req
    const isUpdated = await categoryService.updateCategory(slug, body)
    return res.status(200).json({ success: isUpdated })
  } catch (err: any) {
    return next(err)
  }
}

export default { getAll, getXNumberArticles, getCategoryBySlug, updateCategory }
