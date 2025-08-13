import { Router } from "express";
<<<<<<< HEAD
import { readAdmin, getAllSales, changeOrderDetailStatus, getAllOrders } from "../controllers/admin.controllers";
=======
import { readAdmin, getAllSales, changeOrderDetailStatus, getAllOrders } from "@controllers/admin.controllers";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

const router = Router();

router.get("/admin", readAdmin);
router.get("/admin/sells", getAllSales);
// Estatus pueden cambiar de pending a accepted o anulated
router.patch("/admin/change-order-status", changeOrderDetailStatus);
router.get("/admin/orders", getAllOrders);

export default router;
