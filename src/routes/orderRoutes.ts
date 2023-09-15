import express from "express";

import { protectRoute, restrictTo } from "../controllers/authController";
import {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../controllers/orderController";

const router = express.Router({ mergeParams: true });

router.route("/").get(protectRoute, getAllOrders);
router.route("/").post(protectRoute, createOrder);
router
  .route("/:id")
  .get(protectRoute, getOrder)
  .patch(protectRoute, restrictTo("admin"), updateOrder);

export default router;
