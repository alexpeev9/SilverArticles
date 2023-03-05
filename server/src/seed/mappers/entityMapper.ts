import { Model } from 'mongoose'

const entityMapper = async (
  entityData: any[],
  entityType: Model<any>
): Promise<void> => {
  const modelName = entityType.modelName
  if (await entityType.findOne()) {
    throw new Error(`${modelName} table is not empty.`)
  }
  for (let entity of entityData) {
    let entityDb = new entityType(entity)
    await entityDb.save()
  }
  console.log(`${modelName} data added successfully!`)
}

export default entityMapper
