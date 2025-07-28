import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createOrderService,
    readAllOrdersService,
    readOrderByIdService,
    updateOrderService,
    deleteOrderService
} from "@services/order.services";



export async function readOrder(req: Request, res: Response) {
    const { id } = req.body;

    try {
        const order = await readOrderByIdService(id);

        console.log("Orden leída");
        res.status(200).send(order);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as string));
    }
}


export async function updateOrderItems(req: Request, res: Response) {
    const { id, items } = req.body;

    try {
        const order = await updateOrderService(id, items);

        console.log("Actualizando orden");
        res.status(201).send(order);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}

export async function deleteOrderItems(req: Request, res: Response) {
    const selectAllItemsFlag = -1;
    const { id } = req.body;

    try {
        const order = await deleteOrderService(id);
 
        console.log("Borrado elemento de orden");
        res.status(204).send();
     } catch (error) {
         console.error(error);
         res.status(400).send(createErrorMessage(error as string));
     }
}
