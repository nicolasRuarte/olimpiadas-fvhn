import { Router } from "express";
import { createRatingController, readRatingsController, updateRatingController, deleteRating } from "@controllers/rating.controllers";

const router = Router()

// URL para hacer rating es /rating?uId=(id de usuario)&sId=(id de servicio)&r=(rating)
router.post("/rating", createRatingController);
router.get("/rating", readRatingsController);
router.put("/rating", updateRatingController);
router.delete("/rating", deleteRating);

export default router
