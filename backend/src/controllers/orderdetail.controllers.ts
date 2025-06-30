import { Request, Response } from "express";

export function createOrderDetail(req: Request, res: Response) {
    res.send("Detalle del pedido creado");
}

export function readOrderDetail(req: Request, res: Response) {
    res.send("Detalle del pedido devuelto");
}

export function updateOrderDetail(req: Request, res: Response) {
    res.send("Detalle del pedido actualizado");
}

export function deleteOrderDetail(req: Request, res: Response) {
    res.send("Detalle del pedido borrado");
}
