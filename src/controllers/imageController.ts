import { NextFunction, Response } from "express";
import { NewRequest } from "../types/newRequest";
import { CatchAsync } from "../utils/CatchAsync";
import sharp from "sharp";
import { AppError } from "../utils/AppError";
import fs from "fs";

export const sharpImage = CatchAsync(
  async (req: NewRequest, res: Response, next: NextFunction) => {
    if (!req.file) return next(new AppError("Please upload an image", 400));
    if (!req.body.type)
      return next(new AppError("Please enter image type", 400));

    req.file.filename = `${req.body.type}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/${req.body.type}/${req.file.filename}`);

    next();
  }
);

export const sharpMultiImages = CatchAsync(
  async (req: NewRequest, res: Response, next: NextFunction) => {
    // console.log(req.files, "file");

    if (!req.files || req.files.length == 0)
      return next(new AppError("Please upload atleast one image!", 400));
    if (!req.body.type)
      return next(new AppError("Please enter image type", 400));

    let images: string[] = [];

    await Promise.all(
      (req as any).files!.map(async (file, index) => {
        //* here async is for callback function. So the below code will not await or wait for the next to call
        //* So, next() will call without waiting this async await
        const filename = `product-${Date.now()}-${index + 1}.jpeg`;
        console.log(file, "file test");

        await sharp(file?.buffer)
          .resize(750, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/${req.body.type}/${filename}`);

        images.push(filename);
      })
    );

    req.body.image = images;
    next();
  }
);

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

export const uploadMultipleImages = CatchAsync(
  async (req: NewRequest, res: Response, next: NextFunction) => {
    res.status(201).json({
      status: "success",
      message: "Image uploaded successfully",
      data: req.body.image,
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
