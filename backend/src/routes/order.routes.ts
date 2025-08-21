import { Router } from "express";
import { readOrderByUserDniController, addItemsControlller, removeItemsController, readOrderByIdController } from "@controllers/order.controllers";

const router = Router();

/**
* @swagger
*    /order:
*        post:
*            tags: [order]
*            summary: Añade un nuevo item a la orden, en caso de que ya exista el item se le suma 1 a su cantidad
*
*            requestBody:
*               description: Datos necesarios para realizar una orden
*               required: true
*               content:
*                    application/json:
*                        schema:
*                            type: object
*                            properties:
*                                serviceId:
*                                    type: integer
*                                    description: Número de ID del servicio que queremos agregar
*                                    example: 1
*                                orderId:
*                                    type: integer
*                                    description: Número de ID de la orden que queremos agregar
*                                    example: 1
*                                quantity:
*                                    type: integer
*                                    description: Cantidad que se quiere comprar del item
*                                    example: 5
*
    *
    *
*/
router.post("/order", addItemsControlller); 

router.get("/order/dni", readOrderByUserDniController);

router.get("/order/id", readOrderByIdController);

router.delete("/order", removeItemsController); 


export default router;
