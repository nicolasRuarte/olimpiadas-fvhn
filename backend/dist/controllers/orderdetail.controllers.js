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
exports.createOrderDetail = createOrderDetail;
exports.readOrderDetail = readOrderDetail;
exports.updateOrderDetail = updateOrderDetail;
exports.deleteOrderDetail = deleteOrderDetail;
const db_1 = require("../db");
const OrderDetail_1 = require("@entities/OrderDetail");
const User_1 = require("@entities/User");
const validation_1 = require("@functionality/validation");
const order_controllers_1 = require("./order.controllers");
// Pasando valor any momentáneamente. Cambiar después
function calculateTotalPrice(items) {
    let totalPrice = 0.0;
    for (const item of items) {
        totalPrice += item.price;
    }
    return totalPrice;
}
function createOrderDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orderId, items } = req.body;
        if (items === undefined || items === null || !(0, validation_1.validateStringId)(orderId)) {
            console.error("Error en id o productos de la orden");
            return;
        }
        const manager = db_1.AppDataSource.manager;
        try {
            const newOrderDetail = new OrderDetail_1.OrderDetail;
            newOrderDetail.items = items;
            newOrderDetail.total_price = calculateTotalPrice(items);
            yield manager.save(newOrderDetail);
            console.log("Detalle de orden creado");
            // Usamos orderId para sacar la id de usuario porque son la misma
            const user = yield manager.findOne(User_1.User, { where: { dni: orderId }, relations: { orderDetails: true } });
            if (user === null)
                throw new Error("Usuario no existe");
            if (user.orderDetails === undefined) {
                user.orderDetails = [newOrderDetail];
            }
            else {
                user.orderDetails.push(newOrderDetail);
            }
            yield manager.save(user);
            req.params.id = orderId;
            yield (0, order_controllers_1.deleteOrderItems)(req, res);
            res.status(201).send(newOrderDetail);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function readOrderDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectAllFlag = -1;
        const selectedId = parseInt(req.params.id) || selectAllFlag;
        if (!(0, validation_1.validateNumberId)(selectedId)) {
            console.log("Error de validación al leer detalle de orden");
            res.send("Por favor ingrese un ID de detalle de orden válido");
            return;
        }
        const dataManager = db_1.AppDataSource.manager;
        try {
            let orderDetailFound;
            if (selectedId === selectAllFlag) {
                orderDetailFound = yield dataManager.find(OrderDetail_1.OrderDetail, { order: { order_number: "ASC" } });
                res.send(orderDetailFound);
                console.log("Devolviendo todos los detalles de orden registrados");
                return;
            }
            orderDetailFound = yield dataManager.findOne(OrderDetail_1.OrderDetail, { where: { order_number: selectedId } });
            if (orderDetailFound === null)
                throw new Error("El número de orden solicitado no existe");
            res.status(200).send(orderDetailFound);
            console.log("Devolviendo detalle de orden");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
function updateOrderDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("Detalle de orden actualizado");
    });
}
function deleteOrderDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("Detalle de orden borrado");
    });
}
