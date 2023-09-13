"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.UpdateUser = exports.getMe = exports.updateLoggedUser = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const CatchAsync_1 = require("../utils/CatchAsync");
const AppError_1 = require("../utils/AppError");
const handlerFactory_1 = require("./handlerFactory");
const filterObj = (obj, ...allowedFields) => {
    let newObj = {};
    console.log(obj, allowedFields, "new One");
    Object.keys(obj).map((el) => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj?.[el];
        }
    });
    return newObj;
};
exports.getAllUsers = (0, handlerFactory_1.GetAll)(userModel_1.User, "user", "name");
exports.updateLoggedUser = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    console.log("hello");
    if (req.body.password) {
        return next(new AppError_1.AppError("You cannot update password with this route", 400));
    }
    // if (req.body.photo) {
    //   return next(
    //     new AppError("You cannot update password with this route", 400)
    //   );
    // }
    //* can only edit name and email
    const filteredBody = filterObj(req.body, "name", "email", "photo");
    // console.log(filteredBody, "filtered");
    const updatedUser = await userModel_1.User.findByIdAndUpdate(req.user._id, filteredBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: {
            user: updatedUser,
        },
    });
});
const getMe = (req, res, next) => {
    req.params.id = req.user._id;
    console.log(req.params.id, "param");
    console.log(req.user._id, "id");
    next();
};
exports.getMe = getMe;
exports.UpdateUser = (0, handlerFactory_1.UpdateOne)(userModel_1.User, "user");
exports.getUser = (0, handlerFactory_1.GetOne)(userModel_1.User, "user");
//# sourceMappingURL=userController.js.map