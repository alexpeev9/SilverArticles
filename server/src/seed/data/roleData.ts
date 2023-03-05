const roleData = (): any[] => [
  {
    title: 'Admin',
    description: 'User has full access to all functionalities.'
  },
  {
    title: 'Moderator',
    description:
      'In addition to the write functionalities, the user can moderate articles.'
  },
  {
    title: 'Writer',
    description: 'The user can create and vote for articles.'
  }
]

export default roleData
