import { NextFunction, Response } from "express";
import { User } from "../models/userModel";
import { NewRequest } from "../types/newRequest";
import { CatchAsync } from "../utils/CatchAsync";
import { AppError } from "../utils/AppError";
import { UserDocumentWithId } from "../types/userTypes";

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

export const getAllUsers = CatchAsync(
  async (req: NewRequest, res: Response, next: NextFunction) => {
    const users = await User.findOne();

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  }
);

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
      data: {
        user: updatedUser,
      },
    });
  }
);
