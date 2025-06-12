import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.get("/user", authController.getAuthUser);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/register", authController.register);

export default router;
