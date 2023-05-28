import dotenv from 'dotenv'
dotenv.config()

export const isInProduction: boolean =
  (process.env.NODE_ENV || 'production') === 'production'

export const connectionString = isInProduction
  ? process.env.DB_PROD_URL ||
    'mongodb+srv://{{user}}:{{password}}@{{cluster}}/{{database-name}}'
  : 'mongodb://0.0.0.0:27017/silver-articles'
export const clientUrl = isInProduction
  ? `${process.env.CLIENT_URL || 'https://your-react-site.com'}`
  : 'http://localhost:3000'
export const apiDomain = isInProduction
  ? `${process.env.API_DOMAIN || 'express-api.com'}`
  : 'localhost'
export const apiPort = `${process.env.API_PORT || 5000}`
export const adminPwd = `${process.env.ADMIN_PWD || 'admin'}`
export const salt = `${process.env.SALT || 9}`
export const jwtSecret =
  `${process.env.JWT_SECRET}` || '2625B2735C5D6A8C325424CA34912'
export const roleIds = {
  adminId: `${process.env.ADMIN_ID || '1404f0a2'}`,
  moderatorId: `${process.env.MODERATOR_ID || '2404f0a3'}`,
  writerId: `${process.env.WRITER_ID || '3404f0a4'}`
}
