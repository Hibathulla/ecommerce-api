"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.editCategory = exports.createCategory = exports.getCategory = exports.getAllCategory = exports.deleteOldPhoto = void 0;
const categoryModel_1 = require("../models/categoryModel");
const handlerFactory_1 = require("./handlerFactory");
const fs_1 = __importDefault(require("fs"));
const CatchAsync_1 = require("../utils/CatchAsync");
exports.deleteOldPhoto = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    // if (!req.file) next();
    const category = await categoryModel_1.Category.findById(req.params.id);
    console.log(category, "cat");
    const path = `public/img/category/${category?.billboard}`;
    fs_1.default.unlink(path, (err) => {
        if (err)
            console.log(err);
    });
    next();
});
exports.getAllCategory = (0, handlerFactory_1.GetAll)(categoryModel_1.Category, "category", "category");
exports.getCategory = (0, handlerFactory_1.GetOne)(categoryModel_1.Category, "category");
exports.createCategory = (0, handlerFactory_1.CreateOne)(categoryModel_1.Category, "category");
exports.editCategory = (0, handlerFactory_1.UpdateOne)(categoryModel_1.Category, "category");
exports.deleteCategory = (0, handlerFactory_1.DeleteOne)(categoryModel_1.Category, "category");
//# sourceMappingURL=categoryController.js.map