import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "@root/config";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });

export async function createPayment(req: Request, res: Response) {
    const preference = new Preference(client);

    try {
        const result = await preference.create({
            body: {
                back_urls: {
                    success: "http://localhost:3000",
                },
                items: [
                    {
                        id: "1",
                        title: "Nombre de producto",
                        quantity: 1,
                        unit_price: 100
                    }
                ],
            }
        })

        res.send(result);
    } catch (error) {
        
    }
}
