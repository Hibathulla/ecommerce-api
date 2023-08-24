import multer from "multer";
import { NewRequest } from "../types/newRequest";
import { AppError } from "./AppError";

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

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  //? check if uploaded file is an image. if not return an error
  if (file.mimetype?.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image. Please upload only images.", 400), false);
  }
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
