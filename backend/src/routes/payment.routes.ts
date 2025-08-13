// Rutas para MP
import { Router } from "express";
<<<<<<< HEAD
import { createPayment } from "../controllers/payment.controllers"

const router = Router();

router.get("/create-payment", createPayment);
=======
import { createPayment, renderPaymentPage } from "@controllers/payment.controllers"

const router = Router();

router.post("/payment", createPayment);
router.get("/payment", renderPaymentPage);
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

export default router;
