"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const locationController_1 = require("../controllers/locationController");
const router = express_1.default.Router();
router.use(authController_1.protectRoute);
router.route("/").post(locationController_1.createLocation);
exports.default = router;
//# sourceMappingURL=locationRoutes.js.map