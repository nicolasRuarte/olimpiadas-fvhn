import { Request, Response } from "express";
import { Service } from "../entities/Service";
import { AppDataSource } from "../db";
import { validateNumberId, validateStringId } from "../validation";
import { Order } from "../entities/Order";

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

export async function updateOrderItems(req: Request, res: Response) {
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

        if (order.items === undefined) {
            order.items = [ serviceToAdd ];
        } else {
            order.items.push(serviceToAdd);
        }

        await manager.save(order)
        res.send(order);
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function deleteOrderItems(req: Request, res: Response) {
    const selectAllItemsFlag = -1;
    const orderId = req.params.id;
    const serviceIdToDelete: number = parseInt(req.query.sId as string) || selectAllItemsFlag;
    if (!validateStringId(orderId) || !validateNumberId(serviceIdToDelete)) {
        res.send("Por favor elija un ID de orden o ID de servicio válido");
        return;
    }

    const manager = AppDataSource.manager;

    try {
        let order = await manager.findOne(Order, { where: { id: orderId }, relations: { items: true } });
        if (order === null) {
            console.error("Id de orden para borrar retornó null");
            throw new Error("Error de borrado");
        }

        console.log(orderId);
        if (serviceIdToDelete === selectAllItemsFlag) {
            // Borra todos los elementos del array
            console.log("Entró");
            order.items = order.items.filter((item) => { return item.id === -1 });
            await manager.save(order);
            res.send(order);
            return;
        }

        // item[0] es index e item[1] es el valor
        const index = 0;
        const value = 1;
        for (const entry of order.items.entries()) {
            if (entry[value].id === serviceIdToDelete) {
                order.items.splice(entry[index], 1)
                break;
            }
        }
 
        await manager.save(order);
        res.send(order);
     } catch (error) {
         console.error(error);
         res.send("Error de borrado");
     }
}
