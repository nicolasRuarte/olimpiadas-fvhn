import { Request, Response } from "express";

export function createService(req: Request, res: Response) {
    res.send("Servicio creado");
}

export function getService(req: Request, res: Response) {
    res.send("Servicio devuelto");
}

export function updateService(req: Request, res: Response) {
    res.send("Servicio actualizado");
}

export function deleteService(req: Request, res: Response) {
    res.send("Servicio borrado");
}