import express from "express";
import { protectRoute } from "../controllers/authController";
import { createLocation } from "../controllers/locationController";
const router = express.Router();

router.use(protectRoute);

router.route("/").post(createLocation);

export default router;
