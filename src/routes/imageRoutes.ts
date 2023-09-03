import express from "express";
import { upload } from "../utils/multer";
import { protectRoute } from "../controllers/authController";
import {
  uploadImage,
  sharpImage,
  deleteImage,
  sharpMultiImages,
  uploadMultipleImages,
} from "../controllers/imageController";
const router = express.Router();

router.post(
  "/upload",
  protectRoute,
  upload.single("image"),
  sharpImage,
  uploadImage
);
//? if multiple fileds to upload, use this command => upload.fields([{ name: "image", maxCount: 6 }])
router.post(
  "/multiple-upload",
  protectRoute,
  upload.array("image", 5), //? if only one image field, we can use this method => upload.array
  sharpMultiImages,
  uploadMultipleImages
);

router.post("/delete", protectRoute, deleteImage);

export default router;
