import { Request, Response } from "express";
import {
    logInService
} from "@services/auth.services";
import { validateBody } from "@functionality/validation";
import { createErrorMessage } from "@functionality/errorMessages";

export async function logInController(req: Request, res: Response) {
    const dni = validateBody(req.body) ? req.body.dni : null;
    const password = validateBody(req.body) ? req.body.password : null;

    try {
        if (dni === null) throw new Error("Campo de dni no existe o está vacío");
        if (password === null) throw new Error("Campo de contraseña no existe o está vacío");

        const logInCredentials = await logInService(dni, password);

        console.log("Loggeando usuario");
        res.status(200).send(logInCredentials);
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error)
        res.status(errorData.statusCode as number).send(errorData.message);
    }
}
