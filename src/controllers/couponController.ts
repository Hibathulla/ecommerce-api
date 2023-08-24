import {
  CreateOne,
  DeleteOne,
  GetAll,
  GetOne,
  UpdateOne,
} from "./handlerFactory";
import { Coupon } from "../models/couponModel";

export const getAllCoupons = GetAll(Coupon, "coupon", "couponCode");

export const getCoupon = GetOne(Coupon, "coupon");

export const createCoupon = CreateOne(Coupon, "coupon");

export const editCoupon = UpdateOne(Coupon, "coupon");

export const deleteCoupon = DeleteOne(Coupon, "coupon");
