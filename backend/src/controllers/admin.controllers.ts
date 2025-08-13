import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { AppDataSource } from "../db";
<<<<<<< HEAD
import { OrderDetail } from "../entities/OrderDetail";
=======
import { OrderDetail } from "@entities/OrderDetail";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

export async function readAdmin(req: Request, res: Response) {
    try {
        const token = req.cookies.access_token || "";
<<<<<<< HEAD
        if (token === undefined || token === null || token === "") {
            res.send("null")
            throw new Error("Acceso denegado");
        }
        
        const data = jwt.verify(token, JWT_SECRET) as any;
        if (data.role !== "admin") {
            throw new Error("Acceso denegado")
        }

        res.send("Acceso a admin otorgado");
    } catch (error) {
        console.error(error);      
=======
        if (token === undefined || token === null || token === "") throw new Error("Acceso denegado");
        
        const data = jwt.verify(token, JWT_SECRET) as any;
        if (data.role !== "admin") throw new Error("Acceso denegado")

        res.status(200).send("Acceso a admin otorgado");
    } catch (error) {
        console.error(error);      
        res.status(400).send();
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}

export async function getAllSales(req: Request, res: Response) {
    try {
        console.log("Obteniendo todas las ventas");
    } catch (error) {
        
    }
}

export async function getAllOrders(req: Request, res: Response) {
    try {
        // Opción puede ser "pending", "accepted" o "anulled". Default es pending
        const option = req.body.option || "pending";
<<<<<<< HEAD
        if (option !== "pending" || option !== "accepted" || option !== "annulled") {
            throw new Error("Opción seleccionada no existe");
        }
=======
        if (option !== "pending" || option !== "accepted" || option !== "annulled") throw new Error("Opción seleccionada no existe");

>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
        const manager = AppDataSource.manager;

        const pendingOrders = await manager.find(OrderDetail, { where: { status: option } });

<<<<<<< HEAD
        res.send(pendingOrders);
        console.log("Obteniendo todas las órdenes pendientes");
    } catch (error) {
        console.error(error);
=======
        res.status(200).send(pendingOrders);
        console.log("Obteniendo todas las órdenes pendientes");
    } catch (error) {
        console.error(error);
        res.status(400).send();
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}

export async function changeOrderDetailStatus(req: Request, res: Response) {
    try {
        const { order_number, new_status } = req.body;
        const id = parseInt(order_number);

        const manager = AppDataSource.manager;

        const orderDetail = await manager.findOne(OrderDetail, { where: { order_number: id } } )
        if (orderDetail === null) {
            throw new Error("Detalle de orden no existe");
        }

        orderDetail.status = new_status;
        
        await manager.save(orderDetail);
<<<<<<< HEAD
        res.send("El estatus del detalle de orden fue cambiado con éxito");
    } catch (error) {
        console.error(error);
=======
        res.status(200).send("El estatus del detalle de orden fue cambiado con éxito");
    } catch (error) {
        console.error(error);
        res.status(400).send();
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}
