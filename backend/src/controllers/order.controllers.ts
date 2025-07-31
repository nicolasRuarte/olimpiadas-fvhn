import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createOrderService,
    readAllOrdersService,
    readOrderByIdService,
    updateOrderService,
    deleteOrderService
} from "@services/order.services";
import { validateBody } from "@functionality/validation";



export async function readOrderController(req: Request, res: Response) {
    const selectAllFlag = -1;
    const id = validateBody(req.body) ? req.body.id : selectAllFlag;

    try {
        let order;
        if (id === selectAllFlag) {
            order = await readAllOrdersService();
        } else {
            order = await readOrderByIdService(id);
        }

        console.log("Orden/es leída/s");
        res.status(200).send(order);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as Error));
    }
}


export async function updateOrderItemsController(req: Request, res: Response) {
    const id = req.body ? req.body.id : undefined;
    let items = req.body ? req.body.items : {};

    try {
        const order = await updateOrderService(id, items);

        console.log("Actualizando orden");
        res.status(201).send(order);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as Error));
    }
}

export async function deleteOrderItems(req: Request, res: Response) {
    const selectAllItemsFlag = "-1";
    const id = req.body.id || selectAllItemsFlag;

    try {
        const order = await deleteOrderService(id);
 
        console.log("Borrado elemento de orden");
        res.status(204).send(order);
     } catch (error) {
         console.error(error);
         res.status(400).send(createErrorMessage(error as Error));
     }
}
