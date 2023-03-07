export const isInProduction: boolean =
  (process.env.NODE_ENV || 'production') === 'production'

export const apiUrl: string = isInProduction
  ? `${process.env.REACT_APP_API_PROD_URL}` || 'https://your-api.com'
  : `${process.env.REACT_APP_API_DEV_URL}` || 'http://localhost:3000'
