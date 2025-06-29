import { Router } from "express";
import { createOrderDetail, getOrderDetail, updateOrderDetail, deleteOrderDetail } from "../controllers/orderdetail.controllers";

const router = Router()

router.post("/OrderDetail", createOrderDetail);
router.get("/OrderDetail", getOrderDetail);
router.put("/OrderDetail", updateOrderDetail);
router.delete("/OrderDetail", deleteOrderDetail);

export default router