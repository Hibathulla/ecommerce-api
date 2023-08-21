import { NextFunction, Request, Response } from "express";

export const CatchAsync = (fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
