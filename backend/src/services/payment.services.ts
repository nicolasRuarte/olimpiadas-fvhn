import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "@root/config";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { validateNumberId } from "@functionality/validation";
import itemRepository from "@repositories/item.repository";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });

export async function createPreference(purchase: Items[]): Promise<PreferenceResponse> {
    const preference = new Preference(client);

    const result = await preference.create({
        body: {
            items: purchase,
        }
    });

    return result;
}

export async function makePayment(orderId: number): Promise<Partial<PreferenceResponse>> {
    if (!validateNumberId(orderId)) throw new Error("invalid-number-id");

    // No sé qué estoy haciendo
    const items = itemRepository.readAllFromOrderId(orderId);
    console.log(Items)
    const preference = await createPreference(preference);

    const { id, init_point } = preference;

    return { id, init_point };
}

