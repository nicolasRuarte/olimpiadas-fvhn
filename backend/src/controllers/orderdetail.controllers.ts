import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    readAllOrderDetailsService,
    readOrderDetailByOrderNumberService,
    updateOrderDetailStatusService
} from "@services/orderdetail.services";
import { validateBody } from "@functionality/validation";

export async function readOrderDetailController(req: Request, res: Response) {
    const selectAllFlag = -1;
    const id = validateBody(req.body) ? req.body.id : selectAllFlag;

    try {
        let orderDetail;
        if (id === selectAllFlag) {
            orderDetail = await readAllOrderDetailsService();
        } else {
            orderDetail = await readOrderDetailByOrderNumberService(id);
        }

        console.log("Devolviendo el/los detalle/s de orden");
        res.status(200).send(orderDetail);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err.message);
    }
}

export async function updateOrderDetailStatusController(req: Request, res: Response) {
    const orderNumber = validateBody(req.body) ? req.body.orderNumber : undefined;
    const newStatus = validateBody(req.body) ? req.body.newStatus : undefined;

    try {
        if (!orderNumber || !newStatus) throw new Error("empty-body");

        const updatedOrderDetail = await updateOrderDetailStatusService(orderNumber, newStatus);

        console.log("Actualizando el estatus de la orden");
        res.status(201).send(updatedOrderDetail);
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode as number).send(errorData.message);
    }
}
