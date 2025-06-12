import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.get("/user", authController.getAuthuser);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
