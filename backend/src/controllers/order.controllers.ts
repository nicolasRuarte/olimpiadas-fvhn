import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createOrderService,
    readAllOrdersService,
    readOrderByIdService,
    updateOrderService,
    deleteOrderService,
    addOneItemService,
    removeOneItemService
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


export async function addItemsControlller(req: Request, res: Response) {
    const id = validateBody(req.body) ? req.body.id : undefined;
    let item = validateBody(req.body) ? req.body.item : {};

    try {
        const order = await addOneItemService(id, item);

        console.log("Actualizando orden");
        res.status(201).send(order);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as Error));
    }
}

export async function removeItemsController(req: Request, res: Response) {
    const selectAllItemsFlag = -1;
    const id = validateBody(req.body) ? req.body.id : selectAllItemsFlag;
    const itemIds = validateBody(req.body) ? req.body.itemIds : undefined;

    try {
        if (!itemIds) throw new Error("Por favor seleccione los IDs del item a borrar");

        const order = await removeOneItemService(id, itemIds);
 
        console.log("Borrado elemento de orden");
        res.status(204).send(order);
     } catch (error) {
         console.error(error);
         res.status(400).send(createErrorMessage(error as Error));
     }
}
