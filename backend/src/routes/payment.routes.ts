// Rutas para MP
import { Router } from "express";
import { createPreferenceController, successMessageController } from "@controllers/payment.controllers"
import verifyToken from "@middlewares/auth.middleware";

const router = Router();

router.post("/payment", verifyToken, createPreferenceController);
router.get("/success", successMessageController);

export default router;
