"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = createPayment;
const mercadopago_1 = require("mercadopago");
const config_1 = require("@root/config");
const client = new mercadopago_1.MercadoPagoConfig({ accessToken: config_1.MERCADOPAGO_ACCESS_TOKEN });
function createPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const preference = new mercadopago_1.Preference(client);
        try {
            const result = yield preference.create({
                body: {
                    items: [
                        {
                            id: "1",
                            title: "Nombre de producto",
                            quantity: 1,
                            unit_price: 100
                        }
                    ],
                }
            });
            console.log("Hecho el pago con Mercado Pago");
            res.send(result);
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
