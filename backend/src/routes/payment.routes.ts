// Rutas para MP
import { Router } from "express";
import { createPaymentController, successMessageController } from "@controllers/payment.controllers"
import verifyToken from "@middlewares/auth.middleware";

const router = Router();

router.post("/payment", verifyToken, createPaymentController);
router.get("/success", successMessageController);

export default router;
