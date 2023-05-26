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

  return user
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

export default { getAll, getEntity, getOne, getProfile }
