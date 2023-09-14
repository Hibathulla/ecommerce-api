import express from "express";
import {
  createReview,
  getAllReviews,
  setReviewIds,
  updateReview,
} from "../controllers/reviewController";
import { protectRoute, restrictTo } from "../controllers/authController";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protectRoute, restrictTo("user"), setReviewIds, createReview);

router
  .route("/:id")
  .patch(protectRoute, restrictTo("admin", "user"), updateReview);

export default router;
