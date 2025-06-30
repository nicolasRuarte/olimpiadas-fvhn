import { Router } from "express";
import { createUser, readUser, updateUser, deleteUser } from "../controllers/users.controllers";

const router = Router()

router.post("/users", createUser);
router.get("/users", readUser);
router.put("/users", updateUser);
router.delete("/users", deleteUser);

export default router
