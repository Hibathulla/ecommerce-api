import { NextFunction, Response } from "express";
import { NewRequest } from "../types/newRequest";
import { CatchAsync } from "../utils/CatchAsync";
import sharp from "sharp";
import { AppError } from "../utils/AppError";
import fs from "fs";

export const sharpImage = (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next(new AppError("Please upload an image", 400));
  if (!req.body.type) return next(new AppError("Please enter image type", 400));

  req.file.filename = `${req.body.type}-${req.user?._id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.body.type}/${req.file.filename}`);

  next();
};

export const uploadImage = CatchAsync(
  async (req: NewRequest, res: Response, next: NextFunction) => {
    console.log(req.file, "req.file");

    res.status(201).json({
      status: "success",
      message: "Image uploaded successfully",
      data: req.file?.filename,
    });
  }
);

export const deleteImage = (req, res, next) => {
  const path = `public/img/${req.body.type}/${req.body.image}`;
  fs.unlink(path, (err) => {
    console.log(err, "err");

    next(err);
  });
  res.status(204).json({
    message: "successfully deleted",
  });
};
