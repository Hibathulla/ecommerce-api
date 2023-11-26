import { Request, Response, NextFunction } from "express";
import { Order } from "../models/orderModel";
import { CatchAsync } from "../utils/CatchAsync";
import {
  CreateOne,
  GetAll,
  GetOne,
  UpdateOne,
  DeleteOne,
} from "./handlerFactory";

export const getAllOrders = GetAll(Order, "order", "name");
export const createOrder = CreateOne(Order, "order");

export const getOrder = GetOne(Order, "order", { path: "user" });

export const updateOrder = UpdateOne(Order, "order");
export const deleteOrder = DeleteOne(Order, "order");

export const getOrderStats = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await Order.aggregate([
      // {
      //   $match: { ratingsAverage: { $gte: 4.5 } }, // filter or selects only certain documents
      // },
      {
        $group: {
          _id: null, // selects all docs if no id given
          totalOrders: { $sum: 1 },
          totalAmounts: { $sum: "$total" },
          totalDiscounts: { $sum: "$discount" },
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
