import { Request, Response } from "express";

export async function createOrder(req: Request, res: Response) {
    res.send("Pedido creado");
}

export async function readOrder(req: Request, res: Response) {
    res.send("Pedido devuelto");
}

export async function updateOrder(req: Request, res: Response) {
    res.send("Pedido actualizado");
}

export async function deleteOrder(req: Request, res: Response) {
    res.send("Pedido borrado");
}
