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

export default { getAll }
