import { Router } from "express";
import { createRating, readRating, updateRating, deleteRating } from "../controllers/rating.controllers";

const router = Router()

router.post("/Rating", createRating);
router.get("/Rating", readRating);
router.put("/Rating", updateRating);
router.delete("/Rating", deleteRating);

export default router
