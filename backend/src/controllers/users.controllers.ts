import { Request, Response } from "express";

export function createUser(req: Request, res: Response) {
    res.send("Usuario creado");
}

export function getUser(req: Request, res: Response) {
    res.send("Usuario devuelto");
}

export function updateUser(req: Request, res: Response) {
    res.send("Usuario actualizado");
}

export function deleteUser(req: Request, res: Response) {
    res.send("Usuario borrado");
}
