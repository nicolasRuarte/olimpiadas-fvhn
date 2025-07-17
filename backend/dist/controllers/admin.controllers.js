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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAdmin = readAdmin;
exports.getAllSales = getAllSales;
exports.getAllOrders = getAllOrders;
exports.changeOrderDetailStatus = changeOrderDetailStatus;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const db_1 = require("../db");
const OrderDetail_1 = require("@entities/OrderDetail");
function readAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.access_token || "";
            if (token === undefined || token === null || token === "")
                throw new Error("Acceso denegado");
            const data = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
            if (data.role !== "admin")
                throw new Error("Acceso denegado");
            res.status(200).send("Acceso a admin otorgado");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
function getAllSales(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Obteniendo todas las ventas");
        }
        catch (error) {
        }
    });
}
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Opción puede ser "pending", "accepted" o "anulled". Default es pending
            const option = req.body.option || "pending";
            if (option !== "pending" || option !== "accepted" || option !== "annulled")
                throw new Error("Opción seleccionada no existe");
            const manager = db_1.AppDataSource.manager;
            const pendingOrders = yield manager.find(OrderDetail_1.OrderDetail, { where: { status: option } });
            res.status(200).send(pendingOrders);
            console.log("Obteniendo todas las órdenes pendientes");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
function changeOrderDetailStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { order_number, new_status } = req.body;
            const id = parseInt(order_number);
            const manager = db_1.AppDataSource.manager;
            const orderDetail = yield manager.findOne(OrderDetail_1.OrderDetail, { where: { order_number: id } });
            if (orderDetail === null) {
                throw new Error("Detalle de orden no existe");
            }
            orderDetail.status = new_status;
            yield manager.save(orderDetail);
            res.status(200).send("El estatus del detalle de orden fue cambiado con éxito");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
