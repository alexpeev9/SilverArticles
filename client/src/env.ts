export const isInProduction: boolean =
  (process.env.NODE_ENV || 'production') === 'production'

export const apiUrl: string = isInProduction
  ? `${process.env.REACT_APP_API_URL}` || 'https://your-api.com'
  : 'http://localhost:5000'
