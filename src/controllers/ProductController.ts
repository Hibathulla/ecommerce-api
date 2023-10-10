import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import {
  CreateOne,
  DeleteOne,
  GetAll,
  GetOne,
  UpdateOne,
} from "./handlerFactory";
import { Product } from "../models/productModel";

export const getProduct = GetOne(Product, "product", {
  path: "size category",
  select: "category billboard billboardLabel name value",
});

export const createProduct = CreateOne(Product, "product", {
  path: "size category",
  select: "category billboard billboardLabel name value",
});

export const getAllProducts = GetAll(Product, "product", "name");

export const updateProduct = UpdateOne(Product, "product");

export const deleteProduct = DeleteOne(Product, "product");

export const getProductStats = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await Product.aggregate([
      // {
      //   $match: { ratingsAverage: { $gte: 4.5 } }, // filter or selects only certain documents
      // },
      {
        $group: {
          _id: null, // selects all docs if no id given
          totalProducts: { $sum: 1 },
          featuredProducts: { $sum: "$isFeatured" },
          totalDiscounts: { $sum: "$outOfStock" },
          //   avgRating: { $avg: "$ratingsAverage" }, //given a name as avgRating and calculated avg using $avg for ratingsAverageField
          //   avgPrice: { $avg: "$price" },
          //   minPrice: { $min: "$price" }, //calculated minimum price using $min
          //   maxPrice: { $max: "$price" }, //calculated maximum price using $min
        },
      },
      //   {
      //     $sort: {
      //       avgPrice: 1,
      //     },
      //   },
      // {
      //   $match: { _id: { $ne: 'easy' } }, // our new _ids s is easy, medium, difficult where we defined in $group. here we select _id != easy
      // },
    ]);
    res.status(200).json({
      status: "success",
      data: stats,
    });
  }
);
