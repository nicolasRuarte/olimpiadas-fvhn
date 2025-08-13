import { Request, Response } from "express";
import { AppDataSource } from "../db";
<<<<<<< HEAD
import { OrderDetail } from "../entities/OrderDetail";
import { User } from "../entities/User";
import { validateNumberId, validateStringId } from "../validation";
=======
import { OrderDetail } from "@entities/OrderDetail";
import { User } from "@entities/User";
import { validateNumberId, validateStringId } from "@functionality/validation";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
import { deleteOrderItems } from "./order.controllers";

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
    if (items === undefined || items === null || !validateStringId(orderId)) {
        console.error("Error en id o productos de la orden");
        return;
    }
    

    const manager = AppDataSource.manager;

    try {
        const newOrderDetail = new OrderDetail;
        newOrderDetail.items = items;
        newOrderDetail.total_price = calculateTotalPrice(items);

        await manager.save(newOrderDetail);
        console.log("Detalle de orden creado");

        // Usamos orderId para sacar la id de usuario porque son la misma
        const user = await manager.findOne(User, { where: { dni: orderId }, relations: { orderDetails: true } });
        if ( user === null ) throw new Error("Usuario no existe");

        if (user.orderDetails === undefined) {
            user.orderDetails = [ newOrderDetail ];
        } else {
            user.orderDetails.push(newOrderDetail);
        }

        await manager.save(user);

        req.params.id = orderId;
<<<<<<< HEAD
        deleteOrderItems(req, res)
        console.log("Elementos de carrito borrados");

=======
        await deleteOrderItems(req, res)

        res.status(201).send(newOrderDetail);
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    } catch (error) {
        console.error(error);
    }
}

export async function readOrderDetail(req: Request, res: Response) {
    const selectAllFlag = -1;
    const selectedId = parseInt(req.params.id) || selectAllFlag;
    if (!validateNumberId(selectedId)) {
        console.log("Error de validación al leer detalle de orden");
        res.send("Por favor ingrese un ID de detalle de orden válido");
        return;
    }

    const dataManager = AppDataSource.manager;

    try {
        let orderDetailFound;

        if (selectedId === selectAllFlag) {
            orderDetailFound = await dataManager.find(OrderDetail, { order: { order_number: "ASC" }});
<<<<<<< HEAD
            console.log("Devolviendo todos los detalles de orden registrados");
            res.send(orderDetailFound);
=======
            res.send(orderDetailFound);
            console.log("Devolviendo todos los detalles de orden registrados");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
            return;
        }

        orderDetailFound = await dataManager.findOne(OrderDetail, { where: { order_number: selectedId } })
<<<<<<< HEAD
        if (orderDetailFound === null){
            throw new Error("El número de orden solicitado no existe");
        } 

        res.send(orderDetailFound);
        console.log("Devolviendo detalle de orden");
    } catch (error) {
        console.error(error);
        res.send("Error");
=======
        if (orderDetailFound === null) throw new Error("El número de orden solicitado no existe");

        res.status(200).send(orderDetailFound);
        console.log("Devolviendo detalle de orden");
    } catch (error) {
        console.error(error);
        res.status(400).send();
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}

export async function updateOrderDetail(req: Request, res: Response) {
    res.send("Detalle de orden actualizado");
}

export async function deleteOrderDetail(req: Request, res: Response) {
    res.send("Detalle de orden borrado");
}
