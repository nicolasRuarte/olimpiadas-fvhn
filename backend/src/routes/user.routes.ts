import { Router } from "express";
import { createUser, 
    readUsers,
    updateUser,
    deleteUser,
    logInUser,
    getAllPurchases
<<<<<<< HEAD
} from "../controllers/user.controllers";
=======
} from "@controllers/user.controllers";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

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
