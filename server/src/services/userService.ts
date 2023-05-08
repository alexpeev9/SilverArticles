import { User } from '../models'
import crudService from './crudService'

const service = crudService(User)

const getAll = async () =>
  await service.getAll({}, 'username firstName lastName -_id')

const getEntity = async (username: any) => await service.getEntity({ username })

const getOne = async (username: string) => {
  const user = await service.getOne(
    { username },
    'username firstName lastName articles role -_id'
  )
  user.populate('articles', 'title slug -_id')
  user.populate('role', 'title -_id')

  return user
}

export default { getAll, getEntity, getOne }
