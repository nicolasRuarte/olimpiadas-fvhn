import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createOrderDetailService,
    readAllOrderDetailsService,
    readOrderDetailByOrderNumberService
} from "@services/orderdetail.services";

export async function createOrderDetailController(req: Request, res: Response) {
    const orderId = req.body ? req.body.orderId : undefined;
    const items = req.body ? req.body.items : undefined;

    try {
        if (items === undefined || orderId === undefined) throw new Error("Los items  o el id de la orden no están definidos");

        const newOrderDetail = createOrderDetailService(orderId, items);

        console.log("Detalle de orden creado");
        res.status(201).send(newOrderDetail);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as Error));
    }
}

export async function readOrderDetailController(req: Request, res: Response) {
    const selectAllFlag = -1;
    const id = req.body ? req.body.id : selectAllFlag;

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
