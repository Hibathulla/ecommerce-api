import express from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
} from "../controllers/categoryController";
import { protectRoute, restrictTo } from "../controllers/authController";
import { upload } from "../utils/multer";

const router = express();

router.use(protectRoute);

router.route("/").get(getAllCategory).post(restrictTo("admin"), createCategory);

router
  .route("/:id")
  .patch(restrictTo("admin"), editCategory)
  .delete(restrictTo("admin"), deleteCategory);

export default router;
