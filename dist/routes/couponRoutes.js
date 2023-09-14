"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const couponController_1 = require("../controllers/couponController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.default)();
router.route("/").get(couponController_1.getAllCoupons);
router.use(authController_1.protectRoute);
router.route("/").post((0, authController_1.restrictTo)("admin"), couponController_1.createCoupon);
router.post("/verify-coupon", couponController_1.verifyCoupon);
router
    .route("/:id")
    .get(couponController_1.getCoupon)
    .patch((0, authController_1.restrictTo)("admin"), couponController_1.editCoupon)
    .delete((0, authController_1.restrictTo)("admin"), couponController_1.deleteCoupon);
exports.default = router;
//# sourceMappingURL=couponRoutes.js.map