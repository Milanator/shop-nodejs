import express from "express";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router.get("/", cartController.index);
router.post("/", cartController.store);
// router.delete("/:product", cartController.destroy);

export default router;
