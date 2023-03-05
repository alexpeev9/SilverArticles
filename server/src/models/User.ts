import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import IUser from '../interfaces/entities/IUser'
import env from '../env'

const UserSchema = new Schema<any>(
  {
    username: {
      type: String,
      required: [true, 'Username is required!'],
      unique: true,
      validate: [
        /^[a-zA-Z0-9]+$/,
        'Username should consist of only english letters and digits!'
      ],
      minLength: [3, 'Username cannot be less than 3 characters!'],
      maxLength: [20, 'Username cannot be more than 20 characters!']
    },
    firstName: {
      type: String,
      required: [true, 'First Name is required!'],
      validate: [
        /^[a-zA-Z]+$/,
        'First Name should consist of only english letters!'
      ],
      minLength: [3, 'First Name cannot be less than 3 characters!'],
      maxLength: [20, 'First Name cannot be more than 20 characters!']
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required!'],
      validate: [
        /^[a-zA-Z]+$/,
        'Last Name should consist of only english letters!'
      ],
      minLength: [3, 'Last Name cannot be less than 3 characters!'],
      maxLength: [20, 'Last Name cannot be more than 20 characters!']
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minLength: [4, 'Password cannot be less than 4 characters'],
      maxLength: [60, 'Password cannot be more than 20 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      validate: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is not valid!']
    },
    role: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Role'
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article'
      }
    ]
  },
  { timestamps: true }
)

UserSchema.methods.comparePasswords = (
  candidatePassword: string,
  dbPassword: string
): Promise<boolean> => {
  const isValid: Promise<boolean> = bcrypt.compare(
    candidatePassword,
    dbPassword
  )
  return isValid
}

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.hash(this.password, Number(env.salt)).then((hash) => {
    this.password = hash
    next()
  })
})

const User = model<IUser>('User', UserSchema)

export default User
