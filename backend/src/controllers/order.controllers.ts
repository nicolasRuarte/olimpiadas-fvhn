import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    readAllOrdersService,
    addOneItemService,
    removeOneItemService,
    readOrderByUserDniService
} from "@services/order.services";
import { validateBody } from "@functionality/validation";



export async function readOrderController(req: Request, res: Response) {
    const selectAllFlag = -1;
    const dni = validateBody(req.body) ? req.body.dni : selectAllFlag;

    try {

        let order;
        if (dni === selectAllFlag) {
            order = await readAllOrdersService();
        } else {
            order = await readOrderByUserDniService(dni);
        }

        console.log("Orden/es leída/s");
        res.status(200).send(order);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as Error));
    }
}


export async function addItemsControlller(req: Request, res: Response) {
    const serviceId = validateBody(req.body) ? req.body.serviceId : undefined;
    const orderId = validateBody(req.body) ? req.body.orderId : undefined;
    const quantity = validateBody(req.body) ? req.body.quantity : undefined;

    try {
        if (!serviceId || !orderId || !quantity) throw new Error("empty-body");

        const order = await addOneItemService(serviceId, orderId, quantity);

        console.log("Actualizando orden");
        res.status(201).send(order);
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode).send(errorData.message);
    }
}

export async function removeItemsController(req: Request, res: Response) {
    const orderId = validateBody(req.body) ? req.body.orderId : undefined;
    const serviceId = validateBody(req.body) ? req.body.serviceId : undefined;
    const quantity = validateBody(req.body) ? req.body.quantity : undefined;

    try {
        if (!orderId || !serviceId || !quantity) throw new Error("empty-body");

        const order = await removeOneItemService(serviceId, orderId, quantity);
        console.log("ORDER IN CONTROLLER", order)
 
        console.log("Borrado elemento de orden");
        res.status(201).send(order);
     } catch (error) {
         console.error(error);
         res.status(400).send(createErrorMessage(error as Error));
     }
}
