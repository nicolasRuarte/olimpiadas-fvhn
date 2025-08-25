import { Request, Response } from "express";
import {
    createPreference,
    makePayment
} from "@services/payment.services";
import { validateBody } from "@functionality/validation";
import { createErrorMessage } from "@functionality/errorMessages";
import User from "@entities/User";


export async function createPreferenceController(req: Request, res: Response) {
    const orderId = validateBody(req.body) ? req.body.orderId : undefined;
    const userDni = validateBody(req.body) ? req.body.userDni : undefined;

    try {
        if (!orderId || !userDni) throw new Error("empty-body");

        const payment = await createPreference(userDni);

        console.log("Creando preferencia de Mercado Pago");
        res.status(201).send(`
                             <h1>Para realizar el pago andá al link de abajo</h1>
                             <a href=${payment.init_point}>Link</a>
                             `);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err.message);
    }
}

export async function successMessageController(req: Request, res: Response) {
    const user = validateBody(req.body) ? (req as any).user as User : undefined;
    try {
        if (!user) throw new Error("not-found");

        const orderDetail  = await makePayment(user.dni);

        console.log("Confirmando pago en la base de datos");
        res.status(201).send(orderDetail);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err.message);
    }
}

export function failureMessageController(req: Request, res: Response) {
    try {
        res.send("MAL AHÍ, PA. TE FALLÓ EL PAGO");
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err.message);
    }
}
