import { roleIds } from '../../env'

const roleData = async (): Promise<any[]> => [
  {
    title: 'Admin',
    description: 'User has full access to all functionalities.',
    customId: roleIds.adminId
  },
  {
    title: 'Moderator',
    description: 'User can moderate articles.',
    customId: roleIds.moderatorId
  },
  {
    title: 'Writer',
    description: 'The user can create and vote for articles.',
    customId: roleIds.writerId
  }
]

export default roleData
