import Role from '../../models/Role'
import env from '../../env'

const userData = async (): Promise<any[]> => [
  {
    username: 'admin',
    firstName: 'John',
    lastName: 'Doe',
    role: await Role.findOne({ title: 'Admin' }),
    email: env.adminEmail,
    password: env.adminPwd
  }
]

export default userData
