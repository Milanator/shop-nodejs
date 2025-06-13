import express from "express";
import authController from "../controllers/authController.js";
import { registerRules } from "../validators/auth.js";

const router = express.Router();

router.get("/user", authController.getAuthUser);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/register", registerRules, authController.register);
router.post("/reset-password/request", authController.resetPasswordRequest);
router.post("/reset-password/new", authController.resetPasswordNew);

export default router;
