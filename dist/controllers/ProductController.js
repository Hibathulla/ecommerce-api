"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductStats = exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.createProduct = exports.getProduct = void 0;
const CatchAsync_1 = require("../utils/CatchAsync");
const handlerFactory_1 = require("./handlerFactory");
const productModel_1 = require("../models/productModel");
exports.getProduct = (0, handlerFactory_1.GetOne)(productModel_1.Product, "product", {
    path: "size category",
    select: "category billboard billboardLabel name value",
});
exports.createProduct = (0, handlerFactory_1.CreateOne)(productModel_1.Product, "product", {
    path: "size category",
    select: "category billboard billboardLabel name value",
});
exports.getAllProducts = (0, handlerFactory_1.GetAll)(productModel_1.Product, "product", "name");
exports.updateProduct = (0, handlerFactory_1.UpdateOne)(productModel_1.Product, "product");
exports.deleteProduct = (0, handlerFactory_1.DeleteOne)(productModel_1.Product, "product");
exports.getProductStats = (0, CatchAsync_1.CatchAsync)(async (req, res, next) => {
    const stats = await productModel_1.Product.aggregate([
        // {
        //   $match: { ratingsAverage: { $gte: 4.5 } }, // filter or selects only certain documents
        // },
        {
            $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                featuredProducts: { $sum: "$isFeatured" },
                totalDiscounts: { $sum: "$outOfStock" },
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
//# sourceMappingURL=ProductController.js.map