import { Request, Response } from "express";
import {
    makePayment
} from "@services/payment.services";
import { validateBody } from "@functionality/validation";
import { createErrorMessage } from "@functionality/errorMessages";


export async function createPayment(req: Request, res: Response) {
    const orderId = validateBody(req.body) ? req.body.orderId : undefined;

    try {
        if (!orderId) throw new Error("empty-body");

        const payment = await makePayment(orderId);

        console.log("Realizando pago con Mercado Pago");
        res.status(200).send(payment);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err.message);
    }
}

export async function renderPaymentPage(req: Request, res: Response) {
    res.status(200).render("test-mp");
}
