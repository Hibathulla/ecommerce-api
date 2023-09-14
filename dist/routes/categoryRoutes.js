"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.default)();
router
    .route("/")
    .get(categoryController_1.getAllCategory)
    .post(authController_1.protectRoute, (0, authController_1.restrictTo)("admin"), categoryController_1.createCategory);
router
    .route("/:id")
    .get(categoryController_1.getCategory)
    .patch(authController_1.protectRoute, (0, authController_1.restrictTo)("admin"), categoryController_1.editCategory)
    .delete(authController_1.protectRoute, (0, authController_1.restrictTo)("admin"), categoryController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map