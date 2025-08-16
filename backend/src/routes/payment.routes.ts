// Rutas para MP
import { Router } from "express";
import { createPayment } from "@controllers/payment.controllers"
import verifyToken from "@root/middlewares/auth.middleware";

const router = Router();

router.post("/payment", verifyToken, createPayment);

export default router;
