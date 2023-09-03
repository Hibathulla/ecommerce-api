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

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);

router.use(protectRoute);
router.patch("/updateMe", updateLoggedUser);
router.route("/me").get(getMe, getUser);

router.route("/").get(restrictTo("admin"), getAllUsers);
router
  .route("/:id")
  .get(restrictTo("admin"), getUser)
  .patch(restrictTo("admin"), UpdateUser);

router.route("/updatePassword").post(restrictTo("user"), updatePassword);

export default router;
