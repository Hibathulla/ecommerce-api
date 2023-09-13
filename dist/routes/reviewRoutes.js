"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router({ mergeParams: true });
router
    .route("/")
    .get(reviewController_1.getAllReviews)
    .post(authController_1.protectRoute, (0, authController_1.restrictTo)("user"), reviewController_1.setReviewIds, reviewController_1.createReview);
router
    .route("/:id")
    .patch(authController_1.protectRoute, (0, authController_1.restrictTo)("admin", "user"), reviewController_1.updateReview);
exports.default = router;
//# sourceMappingURL=reviewRoutes.js.map