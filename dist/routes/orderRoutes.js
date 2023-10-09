"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router({ mergeParams: true });
router.route("/").get(authController_1.protectRoute, orderController_1.getAllOrders);
router.route("/").post(authController_1.protectRoute, orderController_1.createOrder);
router
    .route("/:id")
    .get(authController_1.protectRoute, orderController_1.getOrder)
    .patch(authController_1.protectRoute, (0, authController_1.restrictTo)("admin"), orderController_1.updateOrder);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map