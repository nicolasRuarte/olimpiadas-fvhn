import { Request, Response } from "express";

export function createOrder(req: Request, res: Response) {
    res.send("Pedido creado");
}

export function getOrder(req: Request, res: Response) {
    res.send("Pedido devuelto");
}

export function updateOrder(req: Request, res: Response) {
    res.send("Pedido actualizado");
}

export function deleteOrder(req: Request, res: Response) {
    res.send("Pedido borrado");
}