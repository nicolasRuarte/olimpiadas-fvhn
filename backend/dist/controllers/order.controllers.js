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
exports.readOrder = readOrder;
exports.updateOrderItems = updateOrderItems;
exports.deleteOrderItems = deleteOrderItems;
const Service_1 = require("../entities/Service");
const db_1 = require("../db");
const validation_1 = require("@functionality/validation");
const Order_1 = require("../entities/Order");
function readOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectedId = req.params.id;
        if (!(0, validation_1.validateStringId)(selectedId)) {
            res.status(400).send("Error al leer carrito");
            return;
        }
        const manager = db_1.AppDataSource.manager;
        try {
            const orderFound = yield manager.findOne(Order_1.Order, { where: { id: selectedId }, relations: { items: true } });
            if (orderFound === null)
                throw new Error("La orden solicitada no existe");
            res.status(200).send(orderFound);
            console.log("Orden leída");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
function updateOrderItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderId = req.params.id;
        const serviceId = parseInt(req.query.sId);
        if (!(0, validation_1.validateStringId)(orderId) || !(0, validation_1.validateNumberId)(serviceId)) {
            res.status(400).send("Por favor elija un ID de orden o ID de servicio válido");
            return;
        }
        const manager = db_1.AppDataSource.manager;
        try {
            const order = yield manager.findOne(Order_1.Order, { where: { id: orderId }, relations: { items: true } });
            if (order === null)
                throw new Error("ID de orden no existe");
            const serviceToAdd = yield manager.findOne(Service_1.Service, { where: { id: serviceId } });
            if (serviceToAdd === null)
                throw new Error("ID de servicio no existe");
            if (order.items === undefined) {
                order.items = [serviceToAdd];
            }
            else {
                order.items.push(serviceToAdd);
            }
            yield manager.save(order);
            res.status(201).send(order);
            console.log("Actualizando orden");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
            return;
        }
    });
}
function deleteOrderItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectAllItemsFlag = -1;
        const orderId = req.params.id;
        const serviceIdToDelete = parseInt(req.query.sId) || selectAllItemsFlag;
        if (!(0, validation_1.validateStringId)(orderId) || !(0, validation_1.validateNumberId)(serviceIdToDelete)) {
            console.error("Por favor elija un ID de orden o ID de servicio válido");
            res.status(400).send();
            return;
        }
        const manager = db_1.AppDataSource.manager;
        try {
            let order = yield manager.findOne(Order_1.Order, { where: { id: orderId }, relations: { items: true } });
            if (order === null)
                throw new Error("Error de borrado");
            console.log(orderId);
            if (serviceIdToDelete === selectAllItemsFlag) {
                // Borra todos los elementos del array
                order.items = order.items.filter((item) => { return item.id === -1; });
                yield manager.save(order);
                res.send(order);
                console.log("Borrados todos los elementos de la orden");
                return;
            }
            // item[0] es index e item[1] es el valor
            const index = 0;
            const value = 1;
            for (const entry of order.items.entries()) {
                if (entry[value].id === serviceIdToDelete) {
                    order.items.splice(entry[index], 1);
                    break;
                }
            }
            yield manager.save(order);
            res.status(204).send();
            console.log("Borrado elemento de orden");
        }
        catch (error) {
            console.error(error);
            res.status(400).send("Error de borrado");
        }
    });
}
