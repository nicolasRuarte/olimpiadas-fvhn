import { Router } from "express";
import { createServiceController, readServiceControlller, updateServiceController, deleteServiceController } from "@controllers/service.controllers";

const router = Router();

router.post("/service", createServiceController);
router.get("/service", readServiceControlller);
router.get("/service/:id", readServiceControlller);
router.patch("/service", updateServiceController);
router.patch("/service/:id", updateServiceController);
router.delete("/service/:id", deleteServiceController);

export default router;
