import { NextFunction, Response } from "express";
import { User } from "../models/userModel";
import { NewRequest } from "../types/newRequest";
import { CatchAsync } from "../utils/CatchAsync";
import { AppError } from "../utils/AppError";
import { UserDocumentWithId } from "../types/userTypes";
import { GetAll, GetOne, UpdateOne } from "./handlerFactory";

const filterObj = (obj: UserDocumentWithId, ...allowedFields: string[]) => {
  let newObj = {};
  console.log(obj, allowedFields, "new One");
  Object.keys(obj).map((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj?.[el];
    }
  });

  return newObj;
};

export const getAllUsers = GetAll(User, "user", "name");

export const updateLoggedUser = CatchAsync(
  async (req: NewRequest, res: Response, next: NextFunction) => {
    console.log("hello");

    if (req.body.password) {
      return next(
        new AppError("You cannot update password with this route", 400)
      );
    }

    //* can only edit name and email
    const filteredBody = filterObj(req.body, "name", "email");

    req.body = filteredBody;

    const updatedUser = await User.findByIdAndUpdate(
      req.user!._id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: {
        user: updatedUser,
      },
    });
  }
);

export const getMe = (req: NewRequest, res: Response, next: NextFunction) => {
  req.params.id = req.user!._id;
  console.log(req.params.id, "param");
  console.log(req.user!._id, "id");

  next();
};

export const UpdateUser = UpdateOne(User, "user");

export const getUser = GetOne(User, "user");
