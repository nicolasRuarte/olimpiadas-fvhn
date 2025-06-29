import { Router } from "express";
import { createRating, getRating, updateRating, deleteRating } from "../controllers/rating.controllers";

const router = Router()

router.post("/Rating", createRating);
router.get("/Rating", getRating);
router.put("/Rating", updateRating);
router.delete("/Rating", deleteRating);

export default router