import {
  CreateOne,
  DeleteOne,
  GetAll,
  GetOne,
  UpdateOne,
} from "./handlerFactory";
import { Size } from "../models/sizeModel";

export const getAllSizes = GetAll(Size, "size", "name");

export const getSize = GetOne(Size, "size");

export const createSize = CreateOne(Size, "size");

export const editSize = UpdateOne(Size, "size");

export const deleteSize = DeleteOne(Size, "size");
