import { Request, Response } from "express";

export function createRating(req: Request, res: Response) {
    res.send("Rating creado");
}

export function readRating(req: Request, res: Response) {
    res.send("Rating devuelto");
}

export function updateRating(req: Request, res: Response) {
    res.send("Rating actualizado");
}

export function deleteRating(req: Request, res: Response) {
    res.send("Rating borrado");
}
