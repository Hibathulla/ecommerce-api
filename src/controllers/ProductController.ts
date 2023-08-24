import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { CreateOne, GetAll, GetOne } from "./handlerFactory";
import { Product } from "../models/productModel";

export const getProduct = GetOne(Product, "product", {
  path: "size category",
  select: "category billboard billboardLabel name value",
});

export const createProduct = CreateOne(Product, "product");

export const getAllProducts = GetAll(Product, "product", "name");
