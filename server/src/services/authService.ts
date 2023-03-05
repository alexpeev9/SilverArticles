import jwt from 'jsonwebtoken'

import { Role, User } from '../models'
import IUser from '../interfaces/entities/IUser'
import env from '../env'

const register = async (userData: IUser): Promise<string> => {
  const { username, firstName, lastName, email, password } = userData
  await checkIfDuplicate('username', username)
  await checkIfDuplicate('email', email)

  const user = {
    username,
    firstName,
    lastName,
    email,
    password,
    role: await Role.findOne({ title: 'Writer' })
  }

  const createdUser = await User.create(user)

  return createdUser._id
}

const login = async (email: string, password: string): Promise<string> => {
  if (!email && !password) {
    throw new Error('All fields must be filled.')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User not found.')
  }

  if (!(await user.validatePassword(password))) {
    throw new Error('Invalid Password')
  }

  const token = jwt.sign(
    {
      userId: user._id,
      roleId: user.role
    },
    env.jwtSecret,
    {
      expiresIn: '7D'
    }
  )

  return token
}

const checkIfDuplicate = async (
  field: string,
  value: string
): Promise<void> => {
  if (await User.findOne({ [field]: value })) {
    throw new Error(
      `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`
    )
  }
}
export default { register, login }
