import { Request, Response } from 'express'
import { Document, Model } from 'mongoose'

interface CrudService<T extends Document> {
  getAll(req: any, res: string): Promise<any>
}

const crudService = <T extends Document>(model: Model<T>): CrudService<T> => {
  const getAll = async (
    findParams: any,
    selectValues: string
  ): Promise<any> => {
    const data = await model.find(findParams).select(selectValues)
    return data
  }
  return {
    getAll
  }
}

export default crudService
