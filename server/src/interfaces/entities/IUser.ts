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

  comparePasswords(
    candidatePassword: string,
    dbPassword: string
  ): Promise<boolean>
}

export default IUser
