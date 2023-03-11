import { Schema, model } from 'mongoose'

import IRole from '../interfaces/entities/IRole'

const RoleSchema = new Schema<IRole>(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      unique: true,
      minLength: [3, 'Title cannot be less than 3 characters'],
      maxLength: [10, 'Title cannot be more than 10 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
      minLength: [10, 'Description cannot be less than 10 characters'],
      maxLength: [100, 'Description cannot be more than 100 characters']
    },
    customId: {
      type: String,
      required: [true, 'Title is required!'],
      unique: true
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
)

const Role = model<IRole>('Role', RoleSchema)

export default Role
