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

const getXNumber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { number } = req.params
    const articles = await categoryService.getXNumberCategories(number)
    return res.status(200).json(articles)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const category = await categoryService.getOne(slug)
    return res.status(200).json(category)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    const categorySlug = await categoryService.create(data)
    return res.status(200).json(categorySlug)
  } catch (err: any) {
    return next(err)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const { data } = req.body
    const isUpdated = await categoryService.update(slug, data)
    return res.status(200).json({ success: isUpdated })
  } catch (err: any) {
    return next(err)
  }
}

export default { getAll, getOne, getXNumber, create, update }
