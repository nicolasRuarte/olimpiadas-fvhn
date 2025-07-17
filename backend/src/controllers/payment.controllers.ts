import { Request, Response } from "express";
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