import { Schema, model } from 'mongoose';

import ICategory from '../interfaces/entities/ICategory';

const CategorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      unique: true,
      minLength: [3, 'Title cannot be less than 3 characters'],
      maxLength: [30, 'Title cannot be more than 30 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required!'],
      unique: true,
      minLength: [3, 'Slug cannot be less than 3 characters'],
      maxLength: [30, 'Slug cannot be more than 30 characters']
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Articles'
      }
    ]
  },
  { timestamps: true }
);

const Category = model<ICategory>('Category', CategorySchema);

export default Category;
