import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "@root/config";
import { Items } from "mercadopago/dist/clients/commonTypes";
import OrderDetail from "@entities/OrderDetail";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { readOrderByUserDniService } from "@services/order.services";
import { createOrderDetailService } from "./orderdetail.services";
import { readServiceByIdService } from "./service.services";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });


// DELEGAMOS VALIDACIÓN DE LOS IDs AL SERVICIO ORDERDETAIL
export async function makePayment(userDni: string): Promise<OrderDetail> {
    const order = await readOrderByUserDniService(userDni);

    return await createOrderDetailService(order.id);
}

export async function createPreference(userDni: string): Promise<Partial<PreferenceResponse>> {
    const preference = new Preference(client);

    const order = await readOrderByUserDniService(userDni);
    if (order.isBought) throw new Error("La orden ya fue comprada");

    let mercadoPagoItems: Items[] = [];
    for (const item of order.items) {
        const serviceId = item.service as unknown as number; // Chanchada para sacar el id de service en lugar del objeto
        const service = await readServiceByIdService(serviceId); 

        mercadoPagoItems.push({
            id: service.id.toString(), 
            title: service.name,
            unit_price: 1,
            quantity: item.quantity
        });
    }

    console.log(mercadoPagoItems);

    // Las URLs tienen que estar deployadas
    const result = await preference.create({
        body: {
            items: mercadoPagoItems,
            back_urls: {
                success: "127.0.0.1:4000/success",
                failure: "127.0.0.1:4000/failure"
            },
            auto_return: "approved"
        },
    });

    const { id, init_point } = result;

    return { id, init_point };
}
