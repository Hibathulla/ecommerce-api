"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.restrictTo = exports.protectRoute = exports.login = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const AppError_1 = require("../utils/AppError");
const CatchAsync_1 = require("../utils/CatchAsync");
const jwtVerify_1 = require("../utils/jwtVerify");
const generateToken = (res, user, message) => {
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
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
exports.signUp = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    const newUser = await userModel_1.User.create(req.body);
    generateToken(res, newUser);
});
exports.login = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError_1.AppError("Please provide email or password", 400));
    }
    const user = await userModel_1.User.findOne({ email }).select("+password");
    //now to check if entered password is correct
    // const checkPasswordCorrect = await user!.correctPassword(
    //   password,
    //   user?.password
    // );
    // console.log(checkPasswordCorrect, "check");
    // need to define like this always
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError_1.AppError("Invalid email or password", 400));
    }
    generateToken(res, user, "Successfully logged in");
});
exports.protectRoute = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    //* 1) Check if token contains in header and token starts with Bearer
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")?.[1];
    }
    console.log(token, "token");
    if (!token) {
        return next(new AppError_1.AppError("You are not logged in! Please log in to continue", 401));
    }
    //* 2) Verify token
    const tokenVerify = await (0, jwtVerify_1.jwtVerifyPromisified)(token, process.env.JWT_SECRET);
    console.log(tokenVerify, "tokenverify");
    const user = await userModel_1.User.findById(tokenVerify?.id);
    if (!user) {
        return next(new AppError_1.AppError("The user does not exist", 401));
    }
    // console.log(ifPasswordChange, "change");
    if (await user.changedPasswordAfter(tokenVerify.iat)) {
        return next(new AppError_1.AppError("Your password has been changed recently! Please login again", 401));
    }
    req.user = user;
    next();
});
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req?.user?.role)) {
            return next(new AppError_1.AppError("You do not have permission to perform this action!", 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
exports.updatePassword = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    const user = await userModel_1.User.findById(req.user?._id).select("+password");
    if (!user) {
        return next(new AppError_1.AppError("There is no user exist!", 404));
    }
    const passwordIsCorrect = await user.correctPassword(req.body.currentPassword, user.password);
    if (!passwordIsCorrect) {
        return next(new AppError_1.AppError("Your current password is wrong", 403));
    }
    user.password = req.body.password;
    await user.save();
    generateToken(res, user, "Password succesfully changed");
});
//# sourceMappingURL=authController.js.map