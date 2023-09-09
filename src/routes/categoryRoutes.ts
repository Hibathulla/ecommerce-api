import express from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  getCategory,
} from "../controllers/categoryController";
import { protectRoute, restrictTo } from "../controllers/authController";
import { upload } from "../utils/multer";

const router = express();

router
  .route("/")
  .get(protectRoute, getAllCategory)
  .post(protectRoute, restrictTo("admin"), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .patch(protectRoute, restrictTo("admin"), editCategory)
  .delete(protectRoute, restrictTo("admin"), deleteCategory);

export default router;
