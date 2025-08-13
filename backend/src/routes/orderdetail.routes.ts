import { Router } from "express";
<<<<<<< HEAD

import { createOrderDetail, readOrderDetail, updateOrderDetail, deleteOrderDetail } from "../controllers/orderdetail.controllers";
=======
import { createOrderDetail, readOrderDetail, updateOrderDetail, deleteOrderDetail } from "@controllers/orderdetail.controllers";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

const router = Router()

router.post("/orderdetail", createOrderDetail);
router.get("/orderdetail/:id", readOrderDetail); // Devolver todos los OrderDetail solo funciona si pasamos -1 como id
router.patch("/orderdetail", updateOrderDetail);
router.delete("/orderdetail", deleteOrderDetail);

export default router
