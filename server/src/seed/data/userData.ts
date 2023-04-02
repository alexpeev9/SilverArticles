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
  },
  {
    username: 'steven9',
    firstName: 'Steven',
    lastName: 'Smith',
    role: await Role.findOne({ title: 'Moderator' }),
    email: 'mod@gmail.com',
    password: adminPwd
  },
  {
    username: 'parker1',
    firstName: 'Peter',
    lastName: 'Parker',
    role: await Role.findOne({ title: 'Writer' }),
    email: 'writer@gmail.com',
    password: adminPwd
  }
]

export default userData
