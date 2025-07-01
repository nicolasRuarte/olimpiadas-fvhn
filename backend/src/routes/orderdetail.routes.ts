import { Router } from "express";
import { createOrderDetail, readOrderDetail, updateOrderDetail, deleteOrderDetail } from "../controllers/orderdetail.controllers";

const router = Router()

router.post("/orderdetail", createOrderDetail);
router.get("/orderdetail/:id", readOrderDetail);
router.patch("/orderdetail", updateOrderDetail);
router.delete("/orderdetail", deleteOrderDetail);

export default router
