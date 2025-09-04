import { Router } from "express";
import { createPreferenceController, failureMessageController, successMessageController } from "@controllers/payment.controllers"
import verifyToken from "@middlewares/auth.middleware";

const router = Router();

router.post("/payment", verifyToken, createPreferenceController);
router.get("/success", verifyToken, successMessageController);
router.get("/failure", failureMessageController);

export default router;
