// Rutas para MP
import { Router } from "express";
import { createPayment } from "../controllers/payment.controllers"

const router = Router();

router.get("/create-payment", createPayment);

export default router;
