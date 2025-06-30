import { Router } from "express";
import { createOrder, readOrder, updateOrder, deleteOrder } from "../controllers/order.controllers";

const router = Router()

router.post("/order", createOrder);
router.get("/order", readOrder);
router.put("/order", updateOrder);
router.delete("/order", deleteOrder);

export default router
