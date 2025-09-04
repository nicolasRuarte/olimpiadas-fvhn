import { Router } from "express";
import { readAdmin, getAllSales, changeOrderDetailStatus, getAllOrders } from "@controllers/admin.controllers";
import { verifyIfUserIsAdmin } from "@middlewares/auth.middleware";

const router = Router();

router.get("/admin", verifyIfUserIsAdmin, readAdmin);
router.get("/admin/sells", verifyIfUserIsAdmin, getAllSales);
router.patch("/admin/change-order-status", verifyIfUserIsAdmin, changeOrderDetailStatus);
router.get("/admin/orders", verifyIfUserIsAdmin, getAllOrders);

export default router;
