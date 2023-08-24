import express from "express";
import { upload } from "../utils/multer";
import { protectRoute } from "../controllers/authController";
import {
  uploadImage,
  sharpImage,
  deleteImage,
} from "../controllers/imageController";
const router = express.Router();

router.post(
  "/upload",
  protectRoute,
  upload.single("image"),
  sharpImage,
  uploadImage
);
router.post("/delete", protectRoute, deleteImage);

export default router;
