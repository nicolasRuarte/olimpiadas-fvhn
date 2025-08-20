import { Router } from "express";
import { readOrderByUserDniController, addItemsControlller, removeItemsController, readOrderByIdController } from "@controllers/order.controllers";

const router = Router();

router.get("/order/dni", readOrderByUserDniController);
router.get("/order/id", readOrderByIdController);
router.post("/order", addItemsControlller); 
router.delete("/order", removeItemsController); 


export default router;
