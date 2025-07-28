import { Router } from "express";
import { readOrderController, updateOrderItemsController, deleteOrderItems } from "@controllers/order.controllers";

const router = Router();

router.get("/order", readOrderController);
router.post("/order", updateOrderItemsController); 
router.delete("/order", deleteOrderItems); 


export default router;
