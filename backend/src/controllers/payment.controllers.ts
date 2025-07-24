import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "@root/config";
import { Service } from "@entities/Service";
import { Items } from "mercadopago/dist/clients/commonTypes";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });

export async function createPreference(serviceData: Items[]) {
    console.log("SERVICE DATA: ", serviceData);
    const preference = new Preference(client);

    const result = await preference.create({
        body: {
            items: serviceData,
        }
    });
    console.log(result);

    return result;
}

export async function createPayment(req: Request, res: Response) {
    try {
        console.log("Body: ", req.body);
        const result = await createPreference(req.body);

        console.log(`RESULT ID: ${result.id}`)
        res.status(200).send({ preferenceId: result.id, url: result.init_point });
    } catch (error) {
        console.error(error);
        res.status(400).send({message: "Error al crear el pago" });
    }
}

export async function renderPaymentPage(req: Request, res: Response) {
    res.status(200).render("test-mp");
}
