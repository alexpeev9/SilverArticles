import { Role } from '../models'

const findById = async (id: string) => {
  const role = await Role.findById(id).lean()

  if (!role) {
    throw new Error('Role not found')
  }

  return role
}

export default { findById }
