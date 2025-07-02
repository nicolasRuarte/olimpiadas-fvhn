import { Router } from "express";
import { readAdmin } from "../controllers/admin.controllers";

const router = Router();

router.get("/admin", readAdmin);

export default router;
