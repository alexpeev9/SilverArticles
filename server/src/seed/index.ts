import mongoose from 'mongoose'

import { connectionString } from '../env'

import { entityMapper, relationMapper } from './mappers'
import { categoryData, roleData, userData, articleData } from './data'
import { Category, Article, Role, User } from '../models'

async function seed(): Promise<never> {
  try {
    console.log('Migration has started...')

    mongoose.set('strictQuery', true)
    await mongoose.connect(connectionString)

    await entityMapper(categoryData(), Category)
    await entityMapper(await roleData(), Role)
    await entityMapper(await userData(), User)
    await entityMapper(await articleData(), Article)

    await relationMapper(Role, 'users', User, 'role')
    await relationMapper(Category, 'articles', Article, 'category')
    await relationMapper(User, 'articles', Article, 'author')

    await mongoose.disconnect()
    console.log('Initial migration has completed')
    return process.exit(0)
  } catch (err: any) {
    console.log(err.message)
    return process.exit(1)
  }
}

seed()
