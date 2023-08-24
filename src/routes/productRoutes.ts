import express from "express";
import { createProduct, getProduct } from "../controllers/ProductController";
import { protectRoute, restrictTo } from "../controllers/authController";

const router = express();

router
  .route("/")
  .get(protectRoute, restrictTo("user"), getProduct)
  .post(protectRoute, restrictTo("admin"), createProduct);

router.route("/:id").get(protectRoute, getProduct);

export default router;
