import { Document, Schema } from 'mongoose'

interface IUser extends Document {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: Schema.Types.ObjectId
  articles: Schema.Types.ObjectId[]
  votes: Schema.Types.ObjectId[]

  validatePassword(password: string): Promise<boolean>
}

export default IUser
