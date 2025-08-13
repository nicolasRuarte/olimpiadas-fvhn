"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rutas para MP
const express_1 = require("express");
const payment_controllers_1 = require("@controllers/payment.controllers");
const router = (0, express_1.Router)();
router.post("/payment", payment_controllers_1.createPayment);
exports.default = router;
