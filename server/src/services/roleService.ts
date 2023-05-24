import { Role } from '../models'

const find = async (id: string) => {
  const role = await Role.findById(id)

  if (!role) {
    throw new Error(`Authorization failed. Try again later.`)
  }

  return role
}

export default { find }
