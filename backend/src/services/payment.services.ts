import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "@root/config";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { readOrderByIdService } from "@services/order.services";
import { createOrderDetailService } from "./orderdetail.services";
import itemRepository from "@repositories/item.repository";
import { readServiceByIdService } from "./service.services";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });

export async function createPreference(orderId: number, userDni: string): Promise<Partial<PreferenceResponse>> {
    const preference = new Preference(client);

    const order = await readOrderByIdService(orderId);
    if (order.isBought) throw new Error("La orden ya fue comprada");

    let mercadoPagoItems: Items[] = [];
    for (const item of order.items) {
        const service = await readServiceByIdService(item.service as unknown as number); // Chanchada para sacar el id de service en lugar del objeto

        mercadoPagoItems.push({
            id: service.id.toString(), 
            title: service.name,
            description: service.description,
            unit_price: 1,
            quantity: item.quantity
        });
    }

    console.log(mercadoPagoItems);

    const result = await preference.create({
        body: {
            items: mercadoPagoItems,
            back_urls: {
                success: "http://localhost:4000/success"
            }
        },
    });

    const { id, init_point } = result;

    return { id, init_point };
}

// Retorna tanto el ID de la preferencia como la URL para realizar el pago
export async function makePayment(orderId: number, userDni: string): Promise<void> {
    // DELEGAMOS VALIDACIÓN DE LOS IDs AL SERVICIO ORDERDETAIL
}
