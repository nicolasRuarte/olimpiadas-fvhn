"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controllers_1 = require("@controllers/admin.controllers");
const router = (0, express_1.Router)();
router.get("/admin", admin_controllers_1.readAdmin);
router.get("/admin/sells", admin_controllers_1.getAllSales);
// Estatus pueden cambiar de pending a accepted o anulated
router.patch("/admin/change-order-status", admin_controllers_1.changeOrderDetailStatus);
router.get("/admin/orders", admin_controllers_1.getAllOrders);
exports.default = router;
