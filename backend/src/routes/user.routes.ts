import { Router } from "express";
import { createUserController, 
    readUsersController,
    updateUserController,
    deleteUserController,
} from "@controllers/user.controllers";

const router = Router()

router.post("/user", createUserController);
router.get("/user", readUsersController);
router.put("/user", updateUserController);
router.delete("/user", deleteUserController);

export default router
