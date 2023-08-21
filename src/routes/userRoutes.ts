import express from "express";
import {
  signUp,
  login,
  restrictTo,
  updatePassword,
} from "../controllers/authController";
import { getAllUsers, updateLoggedUser } from "../controllers/userController";
import { protectRoute } from "../controllers/authController";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);

router.route("/users").get(getAllUsers);

router
  .route("/updatePassword")
  .post(protectRoute, restrictTo("user"), updatePassword);

router.patch("/updateMe", protectRoute, updateLoggedUser);

export default router;
