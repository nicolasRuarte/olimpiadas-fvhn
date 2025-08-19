// Rutas para MP
import { Router } from "express";
import { createPaymentController } from "@controllers/payment.controllers"
import verifyToken from "@root/middlewares/auth.middleware";

const router = Router();

router.post("/payment", verifyToken, createPaymentController);

export default router;
