import { Document, Model } from 'mongoose'

const crudService = <T extends Document>(model: Model<T>): any => {
  const getAll = async (
    findParams: any,
    selectValues: string
  ): Promise<any> => {
    const data = await model.find(findParams).select(selectValues)
    if (!data) {
      throw new Error(`${model.modelName} not found!`)
    }
    return data
  }

  const getOne = async (
    findParams: any,
    selectValues: string
  ): Promise<any> => {
    const data = await model.findOne(findParams).select(selectValues)
    if (!data) {
      throw new Error(`${model.modelName} not found!`)
    }
    return data
  }

  const getEntity = async (findParams: any): Promise<any> => {
    const data = await model.findOne(findParams)
    if (!data) {
      throw new Error(`${model.modelName} not found!`)
    }
    return data
  }

  const create = async (data: any): Promise<any> => {
    const result = await model.create(data)
    if (!result) {
      throw new Error(
        `An error ocurred, while creating your ${model.modelName}.`
      )
    }
    return result
  }

  const update = async (findParams: any, data: any): Promise<any> => {
    const result = await model.updateOne(
      findParams,
      {
        $set: data
      },
      { runValidators: true }
    )
    if (!result) {
      throw new Error(
        `An error ocurred, while updating your ${model.modelName}.`
      )
    }
    return result
  }

  const checkIfDuplicate = async (field: any, value: string): Promise<void> => {
    if (await model.findOne({ [field]: value })) {
      throw new Error(
        `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`
      )
    }
  }

  return {
    getAll,
    getOne,
    getEntity,
    create,
    update,
    checkIfDuplicate
  }
}
export default crudService
