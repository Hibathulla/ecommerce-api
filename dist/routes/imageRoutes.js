"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../utils/multer");
const authController_1 = require("../controllers/authController");
const imageController_1 = require("../controllers/imageController");
const router = express_1.default.Router();
router.post("/upload", authController_1.protectRoute, multer_1.upload.single("image"), imageController_1.sharpImage, imageController_1.uploadImage);
//? if multiple fileds to upload, use this command => upload.fields([{ name: "image", maxCount: 6 }])
router.post("/multiple-upload", authController_1.protectRoute, multer_1.upload.array("image", 5), //? if only one image field, we can use this method => upload.array
imageController_1.sharpMultiImages, imageController_1.uploadMultipleImages);
router.post("/delete", authController_1.protectRoute, imageController_1.deleteImage);
exports.default = router;
//# sourceMappingURL=imageRoutes.js.map