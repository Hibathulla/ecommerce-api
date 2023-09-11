import express from "express";
import {
  paymentCheckout,
  paymentVerification,
} from "../controllers/paymentController";
import { protectRoute } from "../controllers/authController";

const router = express.Router();

router.route("/").post(protectRoute, paymentCheckout);
router.route("/verify").post(protectRoute, paymentVerification);

export default router;
