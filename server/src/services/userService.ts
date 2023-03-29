import { User } from '../models'

const getAll = async () => {
  const users = await User.find().select([
    'username',
    'firstName',
    'lastName',
    '-_id'
  ])

  return users
}

const getUserByName = async (username: string) => {
  const user = await User.findOne({ username })
    .select(['username', 'firstName', 'lastName', '-_id'])
    .populate('articles', 'title slug -_id')
    .populate('role', 'title -_id')

  if (!user) {
    throw new Error('User not found!')
  }

  return user
}

export default { getAll, getUserByName }
