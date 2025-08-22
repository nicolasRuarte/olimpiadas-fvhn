import { Router } from "express";
import { readOrderByUserDniController, addItemsControlller, removeItemsController, readOrderByIdController } from "@controllers/order.controllers";

const router = Router();

router.post("/order", addItemsControlller); 

router.get("/order/dni", readOrderByUserDniController);

router.get("/order/id", readOrderByIdController);

router.delete("/order", removeItemsController); 


export default router;
