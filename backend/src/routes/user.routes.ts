import { Router } from "express";
import { createUserController, 
    readUsersController,
    updateUserController,
    deleteUserController,
} from "@controllers/user.controllers";
import verifyToken from "@root/middlewares/auth.middleware";

const router = Router()
router.post("/user", createUserController);

router.get("/user", readUsersController);

router.put("/user", verifyToken,  updateUserController);

router.delete("/user", verifyToken, deleteUserController);

export default router
