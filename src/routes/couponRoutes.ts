import express from "express";
import {
  createCoupon,
  deleteCoupon,
  editCoupon,
  getAllCoupons,
  getCoupon,
} from "../controllers/couponController";
import { protectRoute, restrictTo } from "../controllers/authController";
import { upload } from "../utils/multer";

const router = express();

router.use(protectRoute);

router.route("/").get(getAllCoupons).post(restrictTo("admin"), createCoupon);

router
  .route("/:id")
  .get(getCoupon)
  .patch(restrictTo("admin"), editCoupon)
  .delete(restrictTo("admin"), deleteCoupon);

export default router;
