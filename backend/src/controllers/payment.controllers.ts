import { Request, Response } from "express";
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
                ]
            }
        }

        const result = await order.create({ body});
        res.send(result);
    } catch (error) {
        console.error(error);
    }
}
