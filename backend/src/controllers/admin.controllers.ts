import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

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
