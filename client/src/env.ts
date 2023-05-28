export const isInProduction: boolean =
  (process.env.NODE_ENV || 'production') === 'production'

export const apiUrl: string = isInProduction
  ? `${process.env.REACT_APP_API_URL}` || 'https://your-api.com'
  : 'http://localhost:5000'

export const roleIds = {
  adminId: `${process.env.REACT_APP_ADMIN_ID || '1404f0a2'}`,
  moderatorId: `${process.env.REACT_APP_MODERATOR_ID || '2404f0a3'}`,
  writerId: `${process.env.REACT_APP_WRITER_ID || '3404f0a4'}`
}
