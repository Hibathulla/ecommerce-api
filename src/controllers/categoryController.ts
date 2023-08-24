import { NextFunction, Request, Response } from "express";
import { Category } from "../models/categoryModel";
import {
  CreateOne,
  DeleteOne,
  GetAll,
  GetOne,
  UpdateOne,
} from "./handlerFactory";
import sharp from "sharp";
import { NewRequest } from "../types/newRequest";
import fs from "fs";
import { CatchAsync } from "../utils/CatchAsync";

export const deleteOldPhoto = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // if (!req.file) next();
    const category = await Category.findById(req.params.id);
    console.log(category, "cat");

    const path = `public/img/category/${category?.billboard}`;
    fs.unlink(path, (err) => {
      if (err) console.log(err);
    });
    next();
  }
);

export const getAllCategory = GetAll(Category, "category", "category");

export const getCategory = GetOne(Category, "category");

export const createCategory = CreateOne(Category, "category");

export const editCategory = UpdateOne(Category, "category");

export const deleteCategory = DeleteOne(Category, "category");
