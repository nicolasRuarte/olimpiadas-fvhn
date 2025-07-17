// Rutas para MP
import { Router } from "express";
import { createPayment, renderPaymentPage } from "@controllers/payment.controllers"

const router = Router();

router.post("/payment", createPayment);
router.get("/payment", renderPaymentPage);

export default router;
