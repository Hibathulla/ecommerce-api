import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/ProductController";
import { protectRoute, restrictTo } from "../controllers/authController";

const router = express();

router
  .route("/")
  .get(protectRoute, getAllProducts)
  .post(protectRoute, restrictTo("admin"), createProduct);

router
  .route("/:id")
  .get(protectRoute, getProduct)
  .patch(protectRoute, restrictTo("admin"), updateProduct)
  .delete(protectRoute, restrictTo("admin"), deleteProduct);

export default router;
