import { Role, User } from '../models'

import IUser from '../interfaces/entities/IUser'

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

const checkIfDuplicate = async (
  field: string,
  value: string
): Promise<void> => {
  if (await User.findOne({ [field]: value })) {
    throw new Error(
      `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
    )
  }
}
export default { register }
