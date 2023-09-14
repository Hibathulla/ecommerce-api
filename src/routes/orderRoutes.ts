import express from "express";

import { protectRoute } from "../controllers/authController";
import {
  createOrder,
  getAllOrders,
  getOrder,
} from "../controllers/orderController";

const router = express.Router();

router.route("/").get(protectRoute, getAllOrders);
router.route("/").post(protectRoute, createOrder);
router.route("/:id").get(protectRoute, getOrder);

export default router;
