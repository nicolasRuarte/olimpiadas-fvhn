import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createOrderDetailService,
    readAllOrderDetailsService,
    readOrderDetailByOrderNumberService
} from "@services/orderdetail.services";
import { validateBody } from "@functionality/validation";

export async function createOrderDetailController(req: Request, res: Response) {
    const orderId = validateBody(req.body) ? req.body.orderId : undefined;

    try {
        if (!orderId) throw new Error("invalid-id");

        const newOrderDetail = createOrderDetailService(orderId);

        console.log("Detalle de orden creado");
        res.status(201).send(newOrderDetail);
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode as number).send(errorData.message);
    }
}

export async function readOrderDetailController(req: Request, res: Response) {
    const selectAllFlag = -1;
    const id = validateBody(req.body) ? req.body.id : selectAllFlag;

    try {
        let orderDetail;
        if (id === selectAllFlag) {
            orderDetail = readAllOrderDetailsService();
        } else {
            orderDetail = readOrderDetailByOrderNumberService(id);
        }


        console.log("Devolviendo el/los detalle/s de orden");
        res.status(200).send(orderDetail);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as Error));
    }
}
