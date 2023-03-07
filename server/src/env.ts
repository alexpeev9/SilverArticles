import dotenv from 'dotenv'
dotenv.config()

export const isInProduction: boolean =
  (process.env.NODE_ENV || 'production') === 'production'

export const connectionString = isInProduction
  ? process.env.DB_PROD_URL ||
    'mongodb+srv://{{user}}:{{password}}@{{cluster}}/{{database-name}}'
  : 'mongodb://0.0.0.0:27017/silver-articles'
export const clientUrl = isInProduction
  ? `${process.env.CLIENT_URL}` || 'https://your-react-site.com'
  : 'http://localhost:3000'
export const apiPort = process.env.API_PORT || 5000
export const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com'
export const adminPwd = process.env.ADMIN_PWD || 'admin'
export const salt = `${process.env.SALT}` || 9
export const jwtSecret =
  `${process.env.JWTSECRET}` || '2625B2735C5D6A8C325424CA34912'
