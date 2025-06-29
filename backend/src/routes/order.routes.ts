import { Router } from "express";
import { createOrder, getOrder, updateOrder, deleteOrder } from "../controllers/order.controllers";

const router = Router()

router.post("/Order", createOrder);
router.get("/Order", getOrder);
router.put("/Order", updateOrder);
router.delete("/Order", deleteOrder);

export default router