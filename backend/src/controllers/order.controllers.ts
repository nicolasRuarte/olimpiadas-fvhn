import { Request, Response } from "express";
import { Service } from "../entities/Service";
import { AppDataSource } from "../db";
import { validateNumberId, validateStringId } from "../validation";
import { Order } from "../entities/Order";

export async function readOrder(req: Request, res: Response) {
    const selectedId = req.params.id;

    if (!validateStringId(selectedId)) {
        res.status(400).send("Error al leer carrito");
        return;
    }
    
    const manager = AppDataSource.manager;
    try {
        const orderFound = await manager.findOne(Order, { where: { id: selectedId }, relations: { items: true } })
        if (orderFound === null) throw new Error("La orden solicitada no existe");

        res.status(200).send(orderFound);
        console.log("Orden leída");
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }

}
export async function updateOrderItems(req: Request, res: Response) {
    const orderId = req.params.id;
    const serviceId: number = parseInt(req.query.sId as string);

    if (!validateStringId(orderId) || !validateNumberId(serviceId)) {
        res.status(400).send("Por favor elija un ID de orden o ID de servicio válido");
        return;
    }

    const manager = AppDataSource.manager;

    try {
        const order = await manager.findOne(Order, { where: { id: orderId }, relations: { items: true } });
        if (order === null) throw new Error("ID de orden no existe");

        const serviceToAdd = await manager.findOne(Service, { where: { id: serviceId } });
        if (serviceToAdd === null) throw new Error("ID de servicio no existe");

        if (order.items === undefined) {
            order.items = [ serviceToAdd ];
        } else {
            order.items.push(serviceToAdd);
        }

        await manager.save(order)
        res.status(201).send(order);
        console.log("Actualizando orden");
    } catch (error) {
        console.error(error);
        res.status(400).send();
        return;
    }
}

export async function deleteOrderItems(req: Request, res: Response) {
    const selectAllItemsFlag = -1;
    const orderId = req.params.id;
    const serviceIdToDelete: number = parseInt(req.query.sId as string) || selectAllItemsFlag;
    if (!validateStringId(orderId) || !validateNumberId(serviceIdToDelete)) {
        console.error("Por favor elija un ID de orden o ID de servicio válido");
        res.status(400).send();
        return;
    }

    const manager = AppDataSource.manager;

    try {
        let order = await manager.findOne(Order, { where: { id: orderId }, relations: { items: true } });
        if (order === null) throw new Error("Error de borrado");

        console.log(orderId);
        if (serviceIdToDelete === selectAllItemsFlag) {
            // Borra todos los elementos del array
            order.items = order.items.filter((item) => { return item.id === -1 });
            await manager.save(order);
            res.send(order);
            console.log("Borrados todos los elementos de la orden");
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
        res.status(204).send();
        console.log("Borrado elemento de orden");
     } catch (error) {
         console.error(error);
         res.status(400).send("Error de borrado");
     }
}
