import { createErrorMessage } from "@functionality/errorMessages";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@root/config";

export default async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;

    try {
        if (!token) throw new Error("access-denied");

        const decoded = jwt.verify(token, JWT_SECRET);

        // req as any es un truco para que TypeScript no llore y nos deje meterle un atributo más a req
        // Probablemente haya una manera más correcta de hacerlo
        (req as any).user = decoded;

        next();
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode).send(errorData);
    }
}

export async function verifyIfUserIsAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;

    try {
        if (!token) throw new Error("access-denied");

        const decoded = jwt.verify(token, JWT_SECRET);

        if ((decoded as any).role === "client") throw new Error("access-unauthorized");
        
        (req as any).user = decoded;

        next();
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err);
        
    }
}
