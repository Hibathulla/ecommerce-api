"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadMultipleImages = exports.uploadImage = exports.sharpMultiImages = exports.sharpImage = void 0;
const CatchAsync_1 = require("../utils/CatchAsync");
const sharp_1 = __importDefault(require("sharp"));
const AppError_1 = require("../utils/AppError");
const fs_1 = __importDefault(require("fs"));
exports.sharpImage = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    if (!req.file)
        return next(new AppError_1.AppError("Please upload an image", 400));
    if (!req.body.type)
        return next(new AppError_1.AppError("Please enter image type", 400));
    req.file.filename = `${req.body.type}-${Date.now()}.jpeg`;
    await (0, sharp_1.default)(req.file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/${req.body.type}/${req.file.filename}`);
    next();
});
exports.sharpMultiImages = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    // console.log(req.files, "file");
    if (!req.files || req.files.length == 0)
        return next(new AppError_1.AppError("Please upload atleast one image!", 400));
    if (!req.body.type)
        return next(new AppError_1.AppError("Please enter image type", 400));
    let images = [];
    await Promise.all(req.files.map(async (file, index) => {
        //* here async is for callback function. So the below code will not await or wait for the next to call
        //* So, next() will call without waiting this async await
        const filename = `product-${Date.now()}-${index + 1}.jpeg`;
        console.log(file, "file test");
        await (0, sharp_1.default)(file?.buffer)
            .resize(750, 500)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/img/${req.body.type}/${filename}`);
        images.push(filename);
    }));
    req.body.image = images;
    next();
});
exports.uploadImage = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    console.log(req.file, "req.file");
    res.status(201).json({
        status: "success",
        message: "Image uploaded successfully",
        data: req.file?.filename,
    });
});
exports.uploadMultipleImages = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    res.status(201).json({
        status: "success",
        message: "Image uploaded successfully",
        data: req.body.image,
    });
});
const deleteImage = (req, res, next) => {
    const path = `public/img/${req.body.type}/${req.body.image}`;
    fs_1.default.unlink(path, (err) => {
        console.log(err, "err");
        next(err);
    });
    res.status(204).json({
        message: "successfully deleted",
    });
};
exports.deleteImage = deleteImage;
//# sourceMappingURL=imageController.js.map