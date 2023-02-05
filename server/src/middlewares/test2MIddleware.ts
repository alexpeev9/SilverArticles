import { Request, Response, NextFunction } from 'express';

const test2MIddleware = (req: Request, res: Response, next: NextFunction) => {
  return next();
};

export default test2MIddleware;
