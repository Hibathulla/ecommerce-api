import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { IUser, IUserDocument, UserDocumentWithId } from "../types/userTypes";
import { AppError } from "../utils/AppError";
import { CatchAsync } from "../utils/CatchAsync";
import { jwtVerifyPromisified } from "../utils/jwtVerify";
import { NewRequest } from "../types/newRequest";
import { ObjectId } from "mongoose";

interface tokenVerifyType {
  id: string;
  iat: number;
  exp: number;
}

interface UserType extends IUser {
  _id: ObjectId;
}

const generateToken = (
  res: Response,
  user: IUserDocument,
  message?: string
) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;
  res.status(201).json({
    status: "success",
    ...(message && { message }),
    token,
    data: {
      user,
    },
  });
};

export const signUp = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create(req.body);
    generateToken(res, newUser);
  }
);

export const login = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email or password", 400));
    }

    const user: IUserDocument = await User.findOne({ email }).select(
      "+password"
    );

    //now to check if entered password is correct
    // const checkPasswordCorrect = await user!.correctPassword(
    //   password,
    //   user?.password
    // );
    // console.log(checkPasswordCorrect, "check");

    // need to define like this always
    if (!user || !(await user.correctPassword!(password, user.password))) {
      return next(new AppError("Invalid email or password", 400));
    }

    generateToken(res, user, "Successfully logged in");
  }
);

export const protectRoute = CatchAsync(
  async (req: NewRequest, res: Response, next: NextFunction) => {
    //* 1) Check if token contains in header and token starts with Bearer

    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")?.[1];
    }
    console.log(token, "token");

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to continue", 401)
      );
    }

    //* 2) Verify token

    const tokenVerify = await jwtVerifyPromisified(
      token,
      process.env.JWT_SECRET
    );

    console.log(tokenVerify, "tokenverify");
    const user: any = await User.findById((tokenVerify as tokenVerifyType)?.id);

    if (!user) {
      return next(new AppError("The user does not exist", 401));
    }
    // console.log(ifPasswordChange, "change");

    if (await user.changedPasswordAfter((tokenVerify as tokenVerifyType).iat)) {
      return next(
        new AppError(
          "Your password has been changed recently! Please login again",
          401
        )
      );
    }

    req.user = user;

    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: NewRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.user?.role as string)) {
      return next(
        new AppError("You do not have permission to perform this action!", 403)
      );
    }
    next();
  };
};

export const updatePassword = CatchAsync(
  async (req: NewRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id).select("+password");

    if (!user) {
      return next(new AppError("There is no user exist!", 404));
    }

    const passwordIsCorrect = await user!.correctPassword(
      req.body.currentPassword,
      user!.password
    );

    if (!passwordIsCorrect) {
      return next(new AppError("Your current password is wrong", 403));
    }

    user!.password = req.body.password;

    await user!.save();

    generateToken(res, user, "Password succesfully changed");
  }
);
