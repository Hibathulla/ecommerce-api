import express from "express";
import {
  createSize,
  deleteSize,
  editSize,
  getAllSizes,
  getSize,
} from "../controllers/sizeController";
import { protectRoute, restrictTo } from "../controllers/authController";
import { upload } from "../utils/multer";

const router = express();

router.route("/").get(getAllSizes);

router.use(protectRoute);

router.route("/").post(restrictTo("admin"), createSize);

router
  .route("/:id")
  .get(getSize)
  .patch(restrictTo("admin"), editSize)
  .delete(restrictTo("admin"), deleteSize);

export default router;
