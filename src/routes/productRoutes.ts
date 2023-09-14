import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/ProductController";
import { protectRoute, restrictTo } from "../controllers/authController";
import { createReview, setReviewIds } from "../controllers/reviewController";
import reviewRouter from "../routes/reviewRoutes";

const router = express();

router.use("/:productId/review", reviewRouter);

// router
//   .route("/:productId/review")
//   .get()
//   .post(protectRoute, restrictTo("user"), setReviewIds, createReview);

router
  .route("/")
  .get(getAllProducts)
  .post(protectRoute, restrictTo("admin"), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(protectRoute, restrictTo("admin"), updateProduct)
  .delete(protectRoute, restrictTo("admin"), deleteProduct);

export default router;
