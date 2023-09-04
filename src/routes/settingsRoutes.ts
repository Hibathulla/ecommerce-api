import express from "express";
import { protectRoute, restrictTo } from "../controllers/authController";
import { upload } from "../utils/multer";
import {
  createSettingsDetail,
  getSettingsDetail,
  updateSettingsDetail,
} from "../controllers/settingsController";

const router = express();

router.route("/").post(protectRoute, restrictTo("admin"), createSettingsDetail);

router
  .route("/:id")
  .get(getSettingsDetail)
  .patch(protectRoute, restrictTo("admin"), updateSettingsDetail);

export default router;
