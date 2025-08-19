import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "@root/config";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { readOrderByIdService } from "@services/order.services";
import { createOrderDetailService } from "./orderdetail.services";
import itemRepository from "@repositories/item.repository";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });

export async function createPreference(purchase: Items[]): Promise<PreferenceResponse> {
    const preference = new Preference(client);

    const result = await preference.create({
        body: {
            items: purchase,
            back_urls: {
                success: "http://localhost:4000/success"
            }
        },
    });

    return result;
}

// Retorna tanto el ID de la preferencia como la URL para realizar el pago
export async function makePayment(orderId: number, userDni: string): Promise<Partial<PreferenceResponse>> {
    // DELEGAMOS VALIDACIÓN DE LOS IDs AL SERVICIO ORDERDETAIL
    const order = await readOrderByIdService(orderId);
    if (order.isBought) throw new Error("La orden ya fue comprada");

    const orderDetail = await createOrderDetailService(orderId, userDni);

    const items = await itemRepository.readByOrderNumber(orderDetail.order_number);
    
    let mercadoPagoItems: Items[] = [];

    for (const item of items) {
        console.log("ITEMMMMMMMMMMMMMMMMMMM: ", item)
        mercadoPagoItems.push({
            id: item.service.id.toString(),
            title: item.service.name,
            unit_price: 1,
            quantity: item.quantity
        });
    }

    const preference = await createPreference(mercadoPagoItems);

    const { id, init_point } = preference;

    return { id, init_point };
}

