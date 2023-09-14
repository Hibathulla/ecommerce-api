"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.route("/").post(authController_1.protectRoute, paymentController_1.paymentCheckout);
router.route("/verify").post(authController_1.protectRoute, paymentController_1.paymentVerification);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map