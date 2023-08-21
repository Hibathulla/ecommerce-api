import express from "express";
import { getProduct } from "../controllers/ProductController";
import { protectRoute, restrictTo } from "../controllers/authController";

const router = express();

router.route("/").get(protectRoute, restrictTo("user"), getProduct);

export default router;
