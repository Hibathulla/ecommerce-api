"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReview = exports.getAllReviews = exports.createReview = exports.setReviewIds = void 0;
const reviewModel_1 = require("../models/reviewModel");
const handlerFactory_1 = require("./handlerFactory");
const setReviewIds = (req, res, next) => {
    if (!req.body.product)
        req.body.product = req.params.productId;
    req.body.user = req?.user?._id;
    next();
};
exports.setReviewIds = setReviewIds;
exports.createReview = (0, handlerFactory_1.CreateOne)(reviewModel_1.Review, "review", {
    path: "user",
    select: "name email price",
});
exports.getAllReviews = (0, handlerFactory_1.GetAll)(reviewModel_1.Review, "review");
exports.updateReview = (0, handlerFactory_1.UpdateOne)(reviewModel_1.Review, "review");
//# sourceMappingURL=reviewController.js.map