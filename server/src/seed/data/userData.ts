import Role from '../../models/Role'
import { adminEmail, adminPwd } from '../../env'

const userData = async (): Promise<any[]> => [
  {
    username: 'admin',
    firstName: 'John',
    lastName: 'Doe',
    role: await Role.findOne({ title: 'Admin' }),
    email: adminEmail,
    password: adminPwd
  }
]

export default userData
