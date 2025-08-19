import { Router } from "express";
import { createServiceController, readServiceControlller, updateServiceController, deleteServiceController } from "@controllers/service.controllers";
import { verifyIfUserIsAdmin } from "@middlewares/auth.middleware";

const router = Router();

router.post("/service", verifyIfUserIsAdmin, createServiceController);
router.get("/service", readServiceControlller);
router.get("/service/:id", readServiceControlller);
router.patch("/service", verifyIfUserIsAdmin, updateServiceController);
router.delete("/service", verifyIfUserIsAdmin, deleteServiceController);

export default router;
