import jwt from 'jsonwebtoken'

import { Role, User } from '../models'
import IUser from '../interfaces/entities/IUser'
import { jwtSecret } from '../env'

const register = async (userData: IUser): Promise<void> => {
  const { username, firstName, lastName, email, password } = userData
  await checkIfDuplicate('username', username)
  await checkIfDuplicate('email', email)

  const user = new User({
    username,
    firstName,
    lastName,
    email,
    password,
    role: await Role.findOne({ title: 'Writer' })
  })

  await user.save()
}

const login = async (email: string, password: string): Promise<string> => {
  if (!email && !password) {
    throw new Error('All fields must be filled.')
  }

  const user = (await User.findOne({ email }).populate(
    'role',
    'customId -_id'
  )) as any // to get customerId

  if (!user) {
    throw new Error('User not found.')
  }

  if (!(await user.validatePassword(password))) {
    throw new Error('Invalid Password')
  }

  const token = jwt.sign(
    {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: user.role.customId
    },
    jwtSecret,
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
