import { Router } from "express";
import { readOrderController, addItemsControlller, removeItemsController } from "@controllers/order.controllers";

const router = Router();

router.get("/order", readOrderController);
router.post("/order", addItemsControlller); 
router.delete("/order", removeItemsController); 


export default router;
