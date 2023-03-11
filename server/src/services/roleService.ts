import { Role } from '../models'

const find = async (id: string) => {
  const role = await Role.findOne({ customId: id }).lean()
  return role
}

export default { find }
