import { Router } from "express";
import { readOrderController, addItemsControlller, deleteOrderItems } from "@controllers/order.controllers";

const router = Router();

router.get("/order", readOrderController);
router.post("/order", addItemsControlller); 
router.delete("/order", deleteOrderItems); 


export default router;
