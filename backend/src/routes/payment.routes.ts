// Rutas para MP
import { Router } from "express";
import { createSingleProductPayment, renderPaymentPage } from "@controllers/payment.controllers"

const router = Router();

router.post("/payment", createSingleProductPayment);
router.get("/payment", renderPaymentPage);

export default router;
