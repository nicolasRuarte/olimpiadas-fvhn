import { Router } from "express";
import { readAdmin, getAllSales, changeOrderDetailStatus, getAllOrders } from "@controllers/admin.controllers";

const router = Router();

router.get("/admin", readAdmin);
router.get("/admin/sells", getAllSales);
// Estatus pueden cambiar de pending a accepted o anulated
router.patch("/admin/change-order-status", changeOrderDetailStatus);
router.get("/admin/orders", getAllOrders);

export default router;
