import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { AppError } from "../utils/AppError";
import { CatchAsync } from "../utils/CatchAsync";
import { NewRequest } from "../types/newRequest";
import { APIFeatures } from "../utils/ApiFeatures";

export const uploadImage = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);

    res.status(200).json({
      status: "success",
      message: "Image successfully uploaded",
    });
  }
);

export const DeleteOne = (Model: Model<any>, type: string) =>
  CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No current doc found with this id", 404));
    }

    res.status(204).json({
      status: "success",
      message: `${type} deleted`,
      data: null,
    });
  });

export const UpdateOne = (Model: Model<any>, type: string) =>
  CatchAsync(async (req: NewRequest, res: Response, next: NextFunction) => {
    if (req.user!.role === "admin" && req.body.password) {
      return next(new AppError("You cannot update a user password!", 401));
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No current doc found with this id", 404));
    }

    res.status(200).json({
      status: "success",
      message: `${type} updated`,
      data: {
        [type]: doc,
      },
    });
  });

export const CreateOne = (
  Model: Model<any>,
  type: string,
  popOptions?: { path: string; select?: string }
) =>
  CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let doc = await Model.create(req.body);
    if (popOptions) doc = await doc.populate(popOptions);
    // doc.populate("size category");
    // if (!doc) {
    //   return next(new AppError("No current doc found with this id", 404));
    // }

    res.status(201).json({
      status: "success",
      message: `new ${type} created`,
      data: {
        [type]: doc,
      },
    });
  });

export const GetOne = (
  Model: Model<any>,
  type: string,
  popOptions?: { path: string; select?: string }
) =>
  CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);

    // if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError(`No current ${type} found with this id`, 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        [type]: doc,
      },
    });
  });

export const GetAll = (Model: Model<any>, type: string, searchKey?: string) =>
  CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};

    if (req.params.productId) filter = { product: req.params.productId };
    if (req.query.category)
      filter = { ["category.category"]: req.query.category };

    console.log(filter, "filt");

    let features = new APIFeatures(Model.find(filter), req.query, searchKey)
      .search()
      .sort()
      .pagination()
      .filter()
      .limitFields();

    // if (popOptions) query = query.populate(popOptions);

    const doc = await features.query;

    if (!doc) {
      return next(new AppError(`No current ${type} found with this id`, 404));
    }

    res.status(200).json({
      status: "success",
      result: doc?.length,
      data: {
        [type]: doc,
      },
    });
  });
