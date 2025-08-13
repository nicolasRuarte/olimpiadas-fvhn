import { Request, Response } from "express";
<<<<<<< HEAD
import { MercadoPagoConfig, Order } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "../config";

export async function createPayment(req: Request, res: Response) {
    try {
        const client = new MercadoPagoConfig({
            accessToken: MERCADOPAGO_ACCESS_TOKEN
        });

        const order = new Order(client);

        const body = {
            type: "online",
            processing_mode: "automatic",
            total_amount: "1000.00",
            external_reference: "ext_ref_124",
            payer: {
                email: "test_user_1627452495@testuser.com"
            },
            transaction: {
                payments: [
                    {
                        amount: "1000.00",
                        payment_method: {
                            id: "master",
                            type: "credit_card",
                            token: "5031 7557 3453 0604",
                            installments: 1,
                            statement_descriptor: "My Flight"
                        }
                    }
                ],
            }
        })

        console.log("Hecho el pago con Mercado Pago");
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}
=======
import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "@root/config";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });

export async function createPayment(req: Request, res: Response) {
    const preference = new Preference(client);

    try {
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: "1",
                        title: "Nombre de producto",
                        quantity: 1,
                        unit_price: 1
                    }
                ],
            }
        })

        console.log("Hecho el pago con Mercado Pago");
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}

export async function renderPaymentPage(req: Request, res: Response) {
    res.render("test-mp.html");   
}
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
