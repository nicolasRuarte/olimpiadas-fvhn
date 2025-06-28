import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser } from "../controllers/users.controllers";

const router = Router()

router.post("/users", createUser);
router.get("/users", getUser);
router.put("/users", updateUser);
router.delete("/users", deleteUser);

export default router
