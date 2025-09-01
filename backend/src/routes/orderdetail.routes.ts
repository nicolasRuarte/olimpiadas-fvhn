import { Router } from "express";
import { readOrderDetailController, updateOrderDetailStatusController } from "@controllers/orderdetail.controllers";
import { verifyIfUserIsAdmin } from "@middlewares/auth.middleware";

const router = Router()

router.get("/orderdetail", readOrderDetailController); // Devolver todos los OrderDetail solo funciona si pasamos -1 como id
router.patch("/orderdetail/status", verifyIfUserIsAdmin, updateOrderDetailStatusController);

export default router
