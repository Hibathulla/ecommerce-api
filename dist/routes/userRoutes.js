"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const orderRoutes_1 = __importDefault(require("../routes/orderRoutes"));
const router = express_1.default.Router();
router.use("/:userId/order", orderRoutes_1.default);
router.get("/stats", userController_1.getUserStats);
router.post("/register", authController_1.signUp);
router.post("/login", authController_1.login);
router.use(authController_1.protectRoute);
router.patch("/updateMe", userController_1.updateLoggedUser);
router.route("/me").get(userController_1.getMe, userController_1.getUser);
router.route("/").get((0, authController_1.restrictTo)("admin"), userController_1.getAllUsers);
router
    .route("/:id")
    .get((0, authController_1.restrictTo)("admin user"), userController_1.getUser)
    .patch((0, authController_1.restrictTo)("admin"), userController_1.UpdateUser);
router.route("/updatePassword").post((0, authController_1.restrictTo)("user"), authController_1.updatePassword);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map