import jwt from 'jsonwebtoken'

import { Role, User } from '../models'
import IUser from '../interfaces/entities/IUser'
import { jwtSecret } from '../env'
import crudService from './crudService'

const service = crudService(User)

const register = async (userData: IUser): Promise<void> => {
  const { username, firstName, lastName, email, password } = userData
  await service.checkIfDuplicate('username', username)
  await service.checkIfDuplicate('email', email)

  const user = await service.create({
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
  const user = await service.getOne({ email }, 'username password role -_id')
  user.populate('role', 'customId -_id')

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

const getCurrentUser = (token: any) => {
  return token && jwt.verify(token, jwtSecret)
}

export default { register, login, getCurrentUser }
