"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderdetail_controllers_1 = require("@controllers/orderdetail.controllers");
const router = (0, express_1.Router)();
router.post("/orderdetail", orderdetail_controllers_1.createOrderDetail);
router.get("/orderdetail/:id", orderdetail_controllers_1.readOrderDetail); // Devolver todos los OrderDetail solo funciona si pasamos -1 como id
router.patch("/orderdetail", orderdetail_controllers_1.updateOrderDetail);
router.delete("/orderdetail", orderdetail_controllers_1.deleteOrderDetail);
exports.default = router;
