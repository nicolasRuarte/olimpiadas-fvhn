import { Router } from "express";
<<<<<<< HEAD
import { readOrder, updateOrderItems, deleteOrderItems } from "../controllers/order.controllers";
=======
import { readOrder, updateOrderItems, deleteOrderItems } from "@controllers/order.controllers";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

const router = Router()

// :id refiere a la ID de la orden, no del servicio
router.get("/order/:id", readOrder);
router.patch("/order/:id/add", updateOrderItems); // Acepta ID de servicio como parámetro de query (sId=)
router.delete("/order/:id/delete", deleteOrderItems); // Acepta ID de servicio como parámetro query (sId=)


export default router
