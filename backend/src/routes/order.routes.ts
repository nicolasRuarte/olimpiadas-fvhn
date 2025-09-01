import { Router } from "express";
import { readOrderByUserDniController, addItemsControlller, removeItemsController, readOrderByIdController, readAllOrdersController } from "@controllers/order.controllers";

const router = Router();

router.post("/order/items", addItemsControlller); 

router.get("/order", readAllOrdersController);
router.get("/order/dni", readOrderByUserDniController);
router.get("/order/id", readOrderByIdController);

router.delete("/order/items", removeItemsController); 


export default router;
