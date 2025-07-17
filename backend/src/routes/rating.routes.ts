import { Router } from "express";
import { createRating, readRatings, updateRating, deleteRating } from "@controllers/rating.controllers";

const router = Router()

// URL para hacer rating es /rating?uId=(id de usuario)&sId=(id de servicio)&r=(rating)
router.post("/rating", createRating);
router.get("/rating", readRatings);
router.put("/rating", updateRating);
router.delete("/rating", deleteRating);

export default router
