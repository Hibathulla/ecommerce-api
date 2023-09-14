"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sizeController_1 = require("../controllers/sizeController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.default)();
router.route("/").get(sizeController_1.getAllSizes);
router.use(authController_1.protectRoute);
router.route("/").post((0, authController_1.restrictTo)("admin"), sizeController_1.createSize);
router
    .route("/:id")
    .get(sizeController_1.getSize)
    .patch((0, authController_1.restrictTo)("admin"), sizeController_1.editSize)
    .delete((0, authController_1.restrictTo)("admin"), sizeController_1.deleteSize);
exports.default = router;
//# sourceMappingURL=sizeRoutes.js.map