import jwt from 'jsonwebtoken'

import { Role, User } from '../models'
import { jwtSecret } from '../env'
import crudService from './crudService'

const service = crudService(User)

const register = async (userData: any): Promise<void> => {
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

const login = async (username: string, password: string): Promise<string> => {
  if (!username && !password) {
    throw new Error('All fields must be filled.')
  }
  const user = await service.getOne(
    { username },
    'username firstName lastName role password -_id'
  )

  await user.populate('role', 'customId -_id')

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

const getProfile = async (username: string, currentUser: any) => {
  const user = await service.getOne(
    { username },
    'username firstName lastName articles role -_id'
  )

  const showPrivateArticlesValidation =
    currentUser && currentUser.username === user.username
      ? {}
      : { isPublic: true }

  await user.populate(
    'articles',
    'title slug image description -_id',
    showPrivateArticlesValidation
  )
  await user.populate('role', 'title -_id')

  return user
}

const getCurrentUser = async (token: any) => {
  const tokenData = jwt.verify(token, jwtSecret) as any
  const user = await service.getEntity({ username: tokenData.username })
  return user
}

const getEntity = async (username: any) => {
  const user = await service.getEntity({ username })
  await user.populate('role')
  return user
}

export default { register, login, getProfile, getCurrentUser, getEntity }
