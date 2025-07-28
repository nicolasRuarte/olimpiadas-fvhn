import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createOrderDetailService,
    readAllOrderDetailsService,
    readOrderDetailByOrderNumberService
} from "@services/orderdetail.services";

export async function createOrderDetailController(req: Request, res: Response) {
    const { orderId, items } = req.body; 

    try {
        const newOrderDetail = createOrderDetailService(req.body);

        console.log("Detalle de orden creado");
        res.status(201).send(newOrderDetail);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as string));
    }
}

export async function readOrderDetailController(req: Request, res: Response) {
    const selectAllFlag = -1;
    const { id } = req.body;

    try {
        let orderDetail;
        if (id === selectAllFlag) orderDetail = readAllOrderDetailsService();

        orderDetail = readOrderDetailByOrderNumberService(id);

        console.log("Devolviendo detalle de orden");
        res.status(200).send(orderDetail);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}
