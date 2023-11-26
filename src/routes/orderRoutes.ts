import express from "express";

import { protectRoute, restrictTo } from "../controllers/authController";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  getOrderStats,
  updateOrder,
} from "../controllers/orderController";

const router = express.Router({ mergeParams: true });

router.route("/stats").get(getOrderStats);

router.route("/").get(protectRoute, getAllOrders);
router.route("/").post(protectRoute, createOrder);
router
  .route("/:id")
  .get(protectRoute, getOrder)
  .patch(protectRoute, restrictTo("admin"), updateOrder)
  .delete(protectRoute, restrictTo("admin"), deleteOrder);

export default router;
