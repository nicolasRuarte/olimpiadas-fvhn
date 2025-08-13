import { Router } from "express";
<<<<<<< HEAD
import { createRating, readRatings, updateRating, deleteRating } from "../controllers/rating.controllers";
=======
import { createRating, readRatings, updateRating, deleteRating } from "@controllers/rating.controllers";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

const router = Router()

// URL para hacer rating es /rating?uId=(id de usuario)&sId=(id de servicio)&r=(rating)
router.post("/rating", createRating);
router.get("/rating", readRatings);
router.put("/rating", updateRating);
router.delete("/rating", deleteRating);

export default router
