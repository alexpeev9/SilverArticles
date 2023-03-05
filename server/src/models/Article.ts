import { Schema, model } from 'mongoose'

import IArticle from '../interfaces/entities/IArticle'

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      unique: true,
      minLength: [10, 'Title cannot be less than 10 characters'],
      maxLength: [50, 'Title cannot be more than 50 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required!'],
      unique: true,
      minLength: [10, 'Slug cannot be less than 10 characters'],
      maxLength: [50, 'Slug cannot be more than 50 characters']
    },
    image: {
      type: String,
      required: [true, 'Image is required!']
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
      minLength: [3, 'Description cannot be less than 70 characters'],
      maxLength: [1000, 'Description cannot be more than 20 characters']
    },
    isPublic: {
      type: Boolean,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    category: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    author: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
)

const Article = model<IArticle>('Article', ArticleSchema)

export default Article
