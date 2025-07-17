import { Router } from "express";
import { createUser, 
    readUsers,
    updateUser,
    deleteUser,
    logInUser,
    getAllPurchases
} from "@controllers/user.controllers";

const router = Router()

router.post("/user", createUser);
router.get("/user", readUsers);
router.put("/user", updateUser);
router.delete("/user", deleteUser);

// Obtiene el ID mediante JSON en el body
router.get("/user/purchases", getAllPurchases);

//router.get("/user/login", );
router.post("/user/login", logInUser)

export default router
