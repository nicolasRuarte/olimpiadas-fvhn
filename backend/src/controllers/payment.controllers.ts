import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "@root/config";
import { readService, readServiceFromServer } from "@controllers/service.controllers"
import { Service } from "@entities/Service";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });

export async function createSingleProductPayment(req: Request, res: Response) {
    const { id, quantity } = req.body;
    const preference = new Preference(client);

    try {
        const service = await readServiceFromServer(id) as Service;
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: id,
                        title: service.name,
                        quantity: quantity,
                        unit_price: 1 // Por motivos de evitar la bancarrota, el unit_price para TODOS los productos va a ser de 1
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

export async function createCartPayment() {}

export async function renderPaymentPage(req: Request, res: Response) {
    res.render("test-mp.html");   
}
