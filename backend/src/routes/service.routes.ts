import { Router } from "express";
import { createService, getService, updateService, deleteService } from "../controllers/service.controllers";

const router = Router()

router.post("/Service", createService);
router.get("/Service", getService);
router.put("/Service", updateService);
router.delete("/Service", deleteService);

export default router
