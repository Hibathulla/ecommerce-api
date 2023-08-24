import mongoose from "mongoose";
import { couponType } from "../types/coupon";

const couponSchema = new mongoose.Schema<couponType>({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  couponCode: {
    type: String,
    required: [true, "A coupon must have a code"],
    trim: true, // exclude the white spaces
    unique: true,
  },
  discountType: {
    type: String,
    enum: ["percentage", "flat"],
  },
  value: Number,
});

export const Coupon = mongoose.model("Coupon", couponSchema);
