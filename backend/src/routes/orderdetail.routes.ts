import { Router } from "express";
import { createOrderDetailController, readOrderDetailController } from "@controllers/orderdetail.controllers";

const router = Router()

router.post("/orderdetail", createOrderDetailController);
router.get("/orderdetail", readOrderDetailController); // Devolver todos los OrderDetail solo funciona si pasamos -1 como id

export default router
