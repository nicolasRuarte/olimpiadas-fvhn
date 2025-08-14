import { createErrorMessage } from "@functionality/errorMessages";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@root/config";

export default async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;

    try {
        if (!token) throw new Error("access-denied");

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Token plano: ", decoded);

        // Truco para dejar que el compilador de Typescript nos deje asignar el atributo extra al objeto request
        // Probablemente haya una manera más correcta de hacerlo
        (req as any).user = decoded;

        next();
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode).send(errorData.message);
    }
}
