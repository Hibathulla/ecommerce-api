"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const authController_1 = require("../controllers/authController");
const reviewRoutes_1 = __importDefault(require("../routes/reviewRoutes"));
const router = (0, express_1.default)();
router.use("/:productId/review", reviewRoutes_1.default);
// router
//   .route("/:productId/review")
//   .get()
//   .post(protectRoute, restrictTo("user"), setReviewIds, createReview);
router
    .route("/")
    .get(ProductController_1.getAllProducts)
    .post(authController_1.protectRoute, (0, authController_1.restrictTo)("admin"), ProductController_1.createProduct);
router
    .route("/:id")
    .get(ProductController_1.getProduct)
    .patch(authController_1.protectRoute, (0, authController_1.restrictTo)("admin"), ProductController_1.updateProduct)
    .delete(authController_1.protectRoute, (0, authController_1.restrictTo)("admin"), ProductController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map