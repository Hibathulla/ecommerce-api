"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentVerification = exports.paymentCheckout = exports.razorPayInstance = void 0;
const CatchAsync_1 = require("../utils/CatchAsync");
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const orderModel_1 = require("../models/orderModel");
const AppError_1 = require("../utils/AppError");
exports.razorPayInstance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
exports.paymentCheckout = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    var options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    const order = await exports.razorPayInstance.orders.create(options);
    console.log(order, "order");
    res.status(200).json({
        status: "success",
        order,
    });
});
exports.paymentVerification = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    const hmac = crypto_1.default.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(req.body.orderId + "|" + req.body.paymentId);
    let generatedSignature = hmac.digest("hex");
    let signatureIsValid = generatedSignature == req.body.razorpaySignature;
    if (signatureIsValid) {
        let datas = { ...req.body };
        delete datas?.razorpaySignature;
        const orderData = await orderModel_1.Order.create({ ...datas, user: req?.user?._id });
        // .populate("user");
        res.status(201).json({
            status: "success",
            message: `Payment successfully completed`,
            data: {
                orderData,
            },
        });
    }
    else {
        return next(new AppError_1.AppError("Payment failed", 400));
    }
});
//# sourceMappingURL=paymentController.js.map