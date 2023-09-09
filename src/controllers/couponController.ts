import {
  CreateOne,
  DeleteOne,
  GetAll,
  GetOne,
  UpdateOne,
} from "./handlerFactory";
import { Coupon } from "../models/couponModel";
import { CatchAsync } from "../utils/CatchAsync";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const verifyCoupon = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Coupon.findOne({ couponCode: req.body.couponCode });

    console.log(doc, "doc");

    if (!doc) {
      return next(new AppError("Invalid coupon", 400));
    }

    res.status(201).json({
      status: "success",
      message: "Coupon applied successfully",
      data: { doc },
    });
  }
);

export const getAllCoupons = GetAll(Coupon, "coupon", "couponCode");

export const getCoupon = GetOne(Coupon, "coupon");

export const createCoupon = CreateOne(Coupon, "coupon");

export const editCoupon = UpdateOne(Coupon, "coupon");

export const deleteCoupon = DeleteOne(Coupon, "coupon");
