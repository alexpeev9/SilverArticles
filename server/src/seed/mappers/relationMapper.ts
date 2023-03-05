import mongoose, { Model } from 'mongoose'

const relationMapper = async (
  entityTypeWithoutData: Model<any>,
  columnWithoutData: string,
  entityTypeWithData: Model<any>,
  columnWithData: string
): Promise<void> => {
  const entitiesWithoutData = await entityTypeWithoutData.find({})
  const EntityModelNameWithoutData = entityTypeWithoutData.modelName
  const entitiesWithData = await entityTypeWithData.find({})
  const EntityModelNameWithData = entityTypeWithData.modelName

  for (let entityWithoutData of entitiesWithoutData) {
    for (let entityWithData of entitiesWithData) {
      if (
        entityWithData[columnWithData]?._id.toString() ===
        entityWithoutData._id.toString()
      ) {
        const currentId = new mongoose.Types.ObjectId(entityWithData._id)
        entityWithoutData[columnWithoutData].push(currentId)
      }
    }
    await entityWithoutData.save()
  }
  console.log(
    `Data relations duplicated from ${EntityModelNameWithData} to ${EntityModelNameWithoutData}`
  )
}

export default relationMapper
