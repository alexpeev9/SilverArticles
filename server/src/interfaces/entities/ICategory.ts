import { Document, Schema } from 'mongoose'

interface ICategory extends Document {
  title: string
  slug: string
  image: string
  description: string
  articles: Schema.Types.ObjectId[]
}

export default ICategory
