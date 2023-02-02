import dotenv from 'dotenv';
dotenv.config();

const env = {
  connectionString:
    process.env.NODE_ENV === 'production'
      ? process.env.DB_PROD_URL || ''
      : 'mongodb://localhost:27017/silver-articles';
  clientProdUrl: process.env.CLIENT_PROD_URL 
  
};

export default env;
