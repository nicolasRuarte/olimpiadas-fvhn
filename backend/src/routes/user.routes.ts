import { Router } from "express";
import { createUser, 
    readUsers,
    updateUser,
    deleteUser,
    logInUser
} from "../controllers/user.controllers";

const router = Router()

router.post("/user", createUser);
router.get("/user", readUsers);
router.put("/user", updateUser);
router.delete("/user", deleteUser);

router.get("/user/items", (req, res) => console.log("hola"));

router.get("login", (req, res) => console.log("hola"));
router.post("/user/login", logInUser)

export default router
