import { Router } from "express";
import { createService, readService, updateService, deleteService } from "../controllers/service.controllers";

const router = Router()

router.post("/service", createService);
router.get("/service", readService);
router.get("/service/:id", readService);
router.patch("/service", updateService);
router.patch("/service/:id", updateService);
router.delete("/service/:id", deleteService);

export default router
