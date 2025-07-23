import { Router } from "express";
import { readOrder, updateOrderItems, deleteOrderItems } from "@controllers/order.controllers";

const router = Router();

router.get("/order", readOrder);
router.post("/order", updateOrderItems); 
router.delete("/order", deleteOrderItems); 


export default router;
