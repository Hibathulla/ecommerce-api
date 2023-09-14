import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Order } from "../models/orderModel";
import { NewRequest } from "../types/newRequest";
import { AppError } from "../utils/AppError";

export const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentCheckout = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    var options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await razorPayInstance.orders.create(options);
    console.log(order, "order");

    res.status(200).json({
      status: "success",
      order,
    });
  }
);

export const paymentVerification = CatchAsync(
  async (req: NewRequest, res: Response, next: NextFunction) => {
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);

    hmac.update(req.body.orderId + "|" + req.body.paymentId);
    let generatedSignature = hmac.digest("hex");

    let signatureIsValid = generatedSignature == req.body.razorpaySignature;

    if (signatureIsValid) {
      let datas = { ...req.body };
      delete datas?.razorpaySignature;
      const orderData = await Order.create({ ...datas, user: req?.user?._id });
      // .populate("user");

      res.status(201).json({
        status: "success",
        message: `Payment successfully completed`,
        data: {
          orderData,
        },
      });
    } else {
      return next(new AppError("Payment failed", 400));
    }
  }
);
