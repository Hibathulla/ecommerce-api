import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";

export const getProduct = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("hello");
  }
);
