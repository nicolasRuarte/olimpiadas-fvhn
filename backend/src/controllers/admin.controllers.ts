import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { AppDataSource } from "../db";
import { OrderDetail } from "../entities/OrderDetail";

export async function readAdmin(req: Request, res: Response) {
    try {
        const token = req.cookies.access_token || "";
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
    }
}

export async function getAllSales(req: Request, res: Response) {
    try {
        console.log("Obteniendo todas las ventas");
    } catch (error) {
        
    }
}

export async function getAllPendingOrders(req: Request, res: Response) {
    try {
        console.log("Obteniendo todas las órdenes pendientes");
    } catch (error) {
        console.error(error);
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
        res.send("El estatus del detalle de orden fue cambiado con éxito");
    } catch (error) {
        console.error(error);
    }
}
