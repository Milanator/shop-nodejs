import express from "express";
import paymentController from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", paymentController.checkout);

export default router;
