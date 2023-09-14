"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const settingsController_1 = require("../controllers/settingsController");
const router = (0, express_1.default)();
router
    .route("/")
    .get(settingsController_1.getAllSettings)
    .post(authController_1.protectRoute, (0, authController_1.restrictTo)("admin"), settingsController_1.createSettingsDetail);
router
    .route("/:id")
    .get(settingsController_1.getSettingsDetail)
    .patch(authController_1.protectRoute, (0, authController_1.restrictTo)("admin"), settingsController_1.updateSettingsDetail);
exports.default = router;
//# sourceMappingURL=settingsRoutes.js.map