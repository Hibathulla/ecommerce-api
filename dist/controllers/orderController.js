"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStats = exports.deleteOrder = exports.updateOrder = exports.getOrder = exports.createOrder = exports.getAllOrders = void 0;
const orderModel_1 = require("../models/orderModel");
const CatchAsync_1 = require("../utils/CatchAsync");
const handlerFactory_1 = require("./handlerFactory");
exports.getAllOrders = (0, handlerFactory_1.GetAll)(orderModel_1.Order, "order", "name");
exports.createOrder = (0, handlerFactory_1.CreateOne)(orderModel_1.Order, "order");
exports.getOrder = (0, handlerFactory_1.GetOne)(orderModel_1.Order, "order", { path: "user" });
exports.updateOrder = (0, handlerFactory_1.UpdateOne)(orderModel_1.Order, "order");
exports.deleteOrder = (0, handlerFactory_1.DeleteOne)(orderModel_1.Order, "order");
exports.getOrderStats = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    const stats = await orderModel_1.Order.aggregate([
        // {
        //   $match: { ratingsAverage: { $gte: 4.5 } }, // filter or selects only certain documents
        // },
        {
            $group: {
                _id: null,
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
});
//# sourceMappingURL=orderController.js.map