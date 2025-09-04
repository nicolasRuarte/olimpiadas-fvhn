import { Router } from "express";
import { readOrderDetailController, updateOrderDetailStatusController } from "@controllers/orderdetail.controllers";
import { verifyIfUserIsAdmin } from "@middlewares/auth.middleware";

const router = Router()

router.get("/orderdetail", readOrderDetailController);
router.patch("/orderdetail/status", verifyIfUserIsAdmin, updateOrderDetailStatusController);

export default router
