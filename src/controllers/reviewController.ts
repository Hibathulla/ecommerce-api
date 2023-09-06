import { NextFunction, Request, Response } from "express";
import { Review } from "../models/reviewModel";
import { CreateOne, GetAll, UpdateOne } from "./handlerFactory";
import { NewRequest } from "../types/newRequest";

export const setReviewIds = (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.product) req.body.product = req.params.productId;
  req.body.user = req?.user?._id;
  next();
};

export const createReview = CreateOne(Review, "review", {
  path: "user",
  select: "name email price",
});

export const getAllReviews = GetAll(Review, "review");
export const updateReview = UpdateOne(Review, "review");
