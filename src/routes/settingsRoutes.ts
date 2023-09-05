import express from "express";
import { protectRoute, restrictTo } from "../controllers/authController";
import { upload } from "../utils/multer";
import {
  createSettingsDetail,
  getAllSettings,
  getSettingsDetail,
  updateSettingsDetail,
} from "../controllers/settingsController";

const router = express();

router
  .route("/")
  .get(getAllSettings)
  .post(protectRoute, restrictTo("admin"), createSettingsDetail);

router
  .route("/:id")
  .get(getSettingsDetail)
  .patch(protectRoute, restrictTo("admin"), updateSettingsDetail);

export default router;
