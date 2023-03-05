import { Request, Response, NextFunction } from 'express'

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errStatus = err.statusCode || 500
  return res.status(errStatus).json({
    errors: err.errors
      ? Object.values(err.errors).map((val: any) => val.message)
      : [err.message]
  })
}

export default errorMiddleware
