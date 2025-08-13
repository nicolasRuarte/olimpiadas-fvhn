import { Router } from "express";
<<<<<<< HEAD
import { createService, readService, updateService, deleteService } from "../controllers/service.controllers";
=======
import { createService, readService, updateService, deleteService } from "@controllers/service.controllers";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

const router = Router()

router.post("/service", createService);
router.get("/service", readService);
router.get("/service/:id", readService);
router.patch("/service", updateService);
router.patch("/service/:id", updateService);
router.delete("/service/:id", deleteService);

export default router
