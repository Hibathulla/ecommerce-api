"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.editCoupon = exports.createCoupon = exports.getCoupon = exports.getAllCoupons = exports.verifyCoupon = void 0;
const handlerFactory_1 = require("./handlerFactory");
const couponModel_1 = require("../models/couponModel");
const CatchAsync_1 = require("../utils/CatchAsync");
const AppError_1 = require("../utils/AppError");
exports.verifyCoupon = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    const doc = await couponModel_1.Coupon.findOne({ couponCode: req.body.couponCode });
    console.log(doc, "doc");
    if (!doc) {
        return next(new AppError_1.AppError("Invalid coupon", 400));
    }
    res.status(201).json({
        status: "success",
        message: "Coupon applied successfully",
        data: { doc },
    });
});
exports.getAllCoupons = (0, handlerFactory_1.GetAll)(couponModel_1.Coupon, "coupon", "couponCode");
exports.getCoupon = (0, handlerFactory_1.GetOne)(couponModel_1.Coupon, "coupon");
exports.createCoupon = (0, handlerFactory_1.CreateOne)(couponModel_1.Coupon, "coupon");
exports.editCoupon = (0, handlerFactory_1.UpdateOne)(couponModel_1.Coupon, "coupon");
exports.deleteCoupon = (0, handlerFactory_1.DeleteOne)(couponModel_1.Coupon, "coupon");
//# sourceMappingURL=couponController.js.map