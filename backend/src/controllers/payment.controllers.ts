import { Request, Response } from "express";
import {
    createPreference,
    makePayment
} from "@services/payment.services";
import { validateBody } from "@functionality/validation";
import { createErrorMessage } from "@functionality/errorMessages";


export async function createPreferenceController(req: Request, res: Response) {
    const orderId = validateBody(req.body) ? req.body.orderId : undefined;
    const userDni = validateBody(req.body) ? req.body.userDni : undefined;

    try {
        if (!orderId || !userDni) throw new Error("empty-body");

        const payment = await createPreference(orderId, userDni);

        console.log("Creando preferencia de Mercado Pago");
        res.status(201).send(payment);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err.message);
    }
}

export function successMessageController(req: Request, res: Response) {

    try {
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err.message);
    }
}
