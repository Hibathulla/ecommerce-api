import express from "express";
import multer from "multer";
import {
  login,
  protectRoute,
  restrictTo,
  signUp,
  updatePassword,
} from "../controllers/authController";
import {
  UpdateUser,
  getAllUsers,
  getMe,
  getUser,
  updateLoggedUser,
} from "../controllers/userController";
import orderRouter from "../routes/orderRoutes";

const router = express.Router();

router.use("/:userId/order", orderRouter);

router.post("/register", signUp);
router.post("/login", login);

router.use(protectRoute);
router.patch("/updateMe", updateLoggedUser);
router.route("/me").get(getMe, getUser);

router.route("/").get(restrictTo("admin"), getAllUsers);
router
  .route("/:id")
  .get(restrictTo("admin user"), getUser)
  .patch(restrictTo("admin"), UpdateUser);

router.route("/updatePassword").post(restrictTo("user"), updatePassword);

export default router;
