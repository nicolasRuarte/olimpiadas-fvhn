"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controllers_1 = require("@controllers/order.controllers");
const router = (0, express_1.Router)();
// :id refiere a la ID de la orden, no del servicio
router.get("/order/:id", order_controllers_1.readOrder);
router.patch("/order/:id/add", order_controllers_1.updateOrderItems); // Acepta ID de servicio como parámetro de query (sId=)
router.delete("/order/:id/delete", order_controllers_1.deleteOrderItems); // Acepta ID de servicio como parámetro query (sId=)
exports.default = router;
