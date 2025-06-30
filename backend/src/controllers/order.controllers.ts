import { Request, Response } from "express";
import { Service } from "../entities/Service";
import { AppDataSource } from "../db";
import { validateNumberId, validateStringId } from "../validation";
import { Order } from "../entities/Order";

export async function createOrder(req: Request, res: Response) {
    res.send("Pedido creado");
}

export async function readOrder(req: Request, res: Response) {
    const selectedId = req.params.id;

    if (!validateStringId(selectedId)) {
        res.send("Error al leer carrito");
        return;
    }
    
    const manager = AppDataSource.manager;
    try {
        const orderFound = await manager.findOne(Order, { where: { id: selectedId }, relations: { items: true } })
        if (orderFound === null) {
            res.send("La orden solicitada no existe");
            return;
        } 

        res.send(orderFound);
    } catch (error) {
        console.error(error);
    }

}

export async function updateOrder(req: Request, res: Response) {
    const orderId = req.params.id;
    const serviceId: number = parseInt(req.query.sId as string);

    if (!validateStringId(orderId) || !validateNumberId(serviceId)) {
        res.send("Por favor elija un ID de orden o ID de servicio válido");
        return;
    }

    const manager = AppDataSource.manager;

    try {
        const order = await manager.findOne(Order, { where: { id: orderId }, relations: { items: true } });
        if (order === null) {
            throw new Error("ID de orden no existe");
        }

        const serviceToAdd = await manager.findOne(Service, { where: { id: serviceId } });
        if (serviceToAdd === null) {
            throw new Error("ID de servicio no existe");
        }

        console.log(order)
        console.log(serviceToAdd)
        if (order.items === undefined) {
            order.items = [ serviceToAdd ];
        } else {
            order.items.push(serviceToAdd);
        }

        res.send(order);
        await manager.save(order)
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function deleteOrder(req: Request, res: Response) {
    const selectedId = req.params.id;
    const serviceId: number = parseInt(req.query.sId as string);

    if (!validateStringId(selectedId) || !validateNumberId(serviceId)) {
        res.send("Por favor elija un ID de orden o ID de servicio válido");
        return;
    }

    const manager = AppDataSource.manager;
    try {
        const order = await manager.findOne(Order, { where: { id: selectedId }, relations: { items: true } });
        if (order === null) {
            res.send("No se puede borrar porque la orden no existe");
            return;
        }

        console.log("Antes: ", order.items)
        // item[0] es index e item[1] es el valor
        for (const item of order.items.entries()) {
            if (item[1].id === serviceId) {
                order.items.splice(item[0], 1)
                break;
            }
        }
        console.log("Después: ", order.items)

        res.send(order);
        await manager.save(order);
    } catch (error) {
        console.error(error);
    }
}
