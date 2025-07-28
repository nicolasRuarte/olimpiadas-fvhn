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

// Obtiene el ID mediante JSON en el body
//router.get("/user/purchases", getAllPurchases);

//router.get("/user/login", );
//router.post("/user/login", logInUser)

export default router
