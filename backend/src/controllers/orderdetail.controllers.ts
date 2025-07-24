import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { OrderDetail } from "@entities/OrderDetail";
import { User } from "@entities/User";
import { validateNumberId, validateStringId } from "@functionality/validation";
import { deleteItems, deleteOrderItems } from "./order.controllers";
import { createErrorMessage } from "@functionality/errorMessages";

const orderDetailRepository = AppDataSource.getRepository(OrderDetail);
const userRepository  = AppDataSource.getRepository(User);

// Pasando valor any momentáneamente. Cambiar después
function calculateTotalPrice(items: any) {
    let totalPrice = 0.0;
    for (const item of items) {
        totalPrice += item.price;
    }

    return totalPrice;
}

export async function createOrderDetail(req: Request, res: Response) {
    const { orderId, items } = req.body; 

    try {
        if (!validateStringId(orderId)) throw new Error("invalid-id");
        if (items === undefined || items === null) throw new Error("empty-body");

        const newOrderDetail = new OrderDetail;
        newOrderDetail.items = items;
        newOrderDetail.total_price = calculateTotalPrice(items);

        await orderDetailRepository.save(newOrderDetail);
        console.log("Detalle de orden creado");

        // Usamos orderId para sacar la id de usuario porque son la misma
        const user = await userRepository.findOne({ where: { dni: orderId }, relations: { orderDetails: true } });
        if ( user === null ) throw new Error("not-found");

        if (user.orderDetails === undefined) {
            user.orderDetails = [ newOrderDetail ];
        } else {
            user.orderDetails.push(newOrderDetail);
        }

        await userRepository.save(user);

        const selectAllFlag = -1;
        await deleteItems(orderId, selectAllFlag);

        res.status(201).send(newOrderDetail);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as string));
    }
}

export async function readOrderDetail(req: Request, res: Response) {
    const selectAllFlag = -1;
    const selectedId = parseInt(req.params.id) || selectAllFlag;

    try {
        if (!validateNumberId(selectedId)) throw new Error("invalid-id");
        let orderDetailFound;

        if (selectedId === selectAllFlag) {
            orderDetailFound = await orderDetailRepository.find({ order: { order_number: "ASC" }});
            res.send(orderDetailFound);
            console.log("Devolviendo todos los detalles de orden registrados");
            return;
        }

        orderDetailFound = await orderDetailRepository.findOne({ where: { order_number: selectedId } })
        if (orderDetailFound === null) throw new Error("not-found");

        console.log("Devolviendo detalle de orden");
        res.status(200).send(orderDetailFound);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}

export async function updateOrderDetail(req: Request, res: Response) {
    res.send("Detalle de orden actualizado");
}

export async function deleteOrderDetail(req: Request, res: Response) {
    res.send("Detalle de orden borrado");
}
