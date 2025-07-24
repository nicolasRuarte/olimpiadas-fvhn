import { Request, Response } from "express";
import { Service } from "@entities/Service";
import { AppDataSource } from "../db";
import { validateNumberId, validateStringId } from "@functionality/validation";
import { Order } from "@entities/Order";
import { createErrorMessage } from "@functionality/errorMessages";
import { Item } from "@entities/Item";

const orderRepository = AppDataSource.getRepository(Order);
const itemRepository = AppDataSource.getRepository(Item);
const serviceRepository = AppDataSource.getRepository(Service);

export async function readOrderFromServer(id: string) {
    return await orderRepository.findOne({ where: { id: id }, relations: { items: true }});
}

export async function readOrder(req: Request, res: Response) {
    const { id } = req.body;

    try {
        if (!validateStringId(id)) {
            throw new Error("invalid-id");
        }

        const orderFound = await readOrderFromServer(id);
        if (orderFound === null) throw new Error("not-found");

        console.log("Orden leída");
        res.status(200).send(orderFound);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as string));
    }
}

async function saveOrderItems(orderId: string, items: Item[]) {
    const order = await orderRepository.findOne({ where: { id: orderId }, relations: { items: true }});
    if (order === null) throw new Error("not-found");

    if (order?.items === undefined || order.items === null) {
        order.items = items;
    } else {
        for (const item of items) {
            // Asigna la bidireccionalidad de las relaciones item-order e item-service
            itemRepository.save(item);

            order.items.push(item);
        }
    }
    
    await orderRepository.save(order);

    return order;
}

export async function updateOrderItems(req: Request, res: Response) {
    const { orderId, items } = req.body;

    try {
        const order = await saveOrderItems(orderId, items);

        console.log("Actualizando orden");
        res.status(201).send(order);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}

// Por propósitos de debuggeo, la función devuelve la orden luego de haber borrado sus elementos
export async function deleteItems(id: string, serviceId: number) {
    const selectAllItemsFlag = -1;
    const order = await orderRepository.findOne({ where: { id: id }, relations: { items: true } });

    if (order === null) throw new Error("not-found");

    if (order.items === undefined || order.items === null) throw new Error("La orden no tiene ningún elemento");
    
    if (serviceId === selectAllItemsFlag) {
        order.items = [];
        await orderRepository.save(order);
        return order;
    }

    order.items = order.items.filter(function(item) { return item.serviceId !== serviceId });

    await orderRepository.save(order);

    return order;
}

export async function deleteOrderItems(req: Request, res: Response) {
    const selectAllItemsFlag = -1;
    const orderId = req.params.id;
    const serviceIdToDelete: number = parseInt(req.query.sId as string) || selectAllItemsFlag;


    try {
        if (!validateStringId(orderId) || !validateNumberId(serviceIdToDelete)) throw new Error("invalid-id");

        const order = await deleteItems(orderId, serviceIdToDelete)
        if (order === null) throw new Error("not-found");
 
        console.log("Borrado elemento de orden");
        res.status(204).send(order);
     } catch (error) {
         console.error(error);
         res.status(400).send(createErrorMessage(error as string));
     }
}
