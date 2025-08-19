import { Request, Response } from "express";
import {
    makePayment
} from "@services/payment.services";
import { validateBody } from "@functionality/validation";
import { createErrorMessage } from "@functionality/errorMessages";


export async function createPaymentController(req: Request, res: Response) {
    const orderId = validateBody(req.body) ? req.body.orderId : undefined;
    const userDni = validateBody(req.body) ? req.body.userDni : undefined;

    try {
        if (!orderId || !userDni) throw new Error("empty-body");

        const payment = await makePayment(orderId, userDni);

        console.log("Realizando pago con Mercado Pago");
        res.status(302).send(payment);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err.message);
    }
}

export function succesMessageController(req: Request, res: Response) {
    res.status(201).send({ message: "El producto fue pagado con éxito.", statusCode: 201 })
}
