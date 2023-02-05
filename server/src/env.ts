import dotenv from 'dotenv';
dotenv.config();

const isInProduction: boolean = process.env.NODE_ENV === 'production';

const env = {
  connectionString: isInProduction
    ? process.env.DB_PROD_URL ||
      'mongodb+srv://{{user}}:{{password}}@{{cluster}}/{{database-name}}'
    : 'mongodb://localhost:27017/silver-articles',
  clientUrl: isInProduction
    ? process.env.CLIENT_URL || 'https://your-react-site.com'
    : 'http://localhost:3000',
  apiPort: process.env.API_PORT || 5000,
  adminEmail: process.env.ADMIN_EMAIL || 'admin@admin.com',
  adminPwd: process.env.ADMIN_PWD || 'admin'
};

export default env;
