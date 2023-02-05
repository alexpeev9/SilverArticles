import { Request, Response, NextFunction } from 'express';

const testMiddleware = (req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json('User is not authorized!');
};

export default testMiddleware;
