import { Order } from "../models/orderModel";
import { CreateOne, GetAll, GetOne, UpdateOne } from "./handlerFactory";

export const getAllOrders = GetAll(Order, "order", "name");
export const createOrder = CreateOne(Order, "order");

export const getOrder = GetOne(Order, "order", { path: "user" });

export const updateOrder = UpdateOne(Order, "order");
