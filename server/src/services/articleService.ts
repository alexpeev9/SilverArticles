import { Request, Response } from 'express'
import crudService from '../services/crudService'
import Article from '../models/Article'

const service = crudService(Article)

const getAll = async (): Promise<any> => {
  const articles = await service.getAll(
    { isPublic: true },
    'title slug image -_id'
  )
  return articles
}

export default { getAll }
