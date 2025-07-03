import { Router } from "express";
import { readAdmin, getAllSales, changeOrderDetailStatus } from "../controllers/admin.controllers";

const router = Router();

router.get("/admin", readAdmin);
router.get("/admin/sells", getAllSales);
// Estatus pueden cambiar de pending a accepted o anulated
router.patch("/admin/change-order-status", changeOrderDetailStatus);

export default router;
