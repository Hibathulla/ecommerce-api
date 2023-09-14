"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const AppError_1 = require("./AppError");
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req: NewRequest, file, cb) => {
//     //generating unique photo name
//     const ext = file.mimetype.split("/")?.[1];
//     cb(null, `user-${req.user?._id}-${Date.now()}.${ext}`);
//   },
// });
const multerStorage = multer_1.default.memoryStorage();
const multerFilter = (req, file, cb) => {
    //? check if uploaded file is an image. if not return an error
    if (file.mimetype?.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.AppError("Not an image. Please upload only images.", 400), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
//# sourceMappingURL=multer.js.map