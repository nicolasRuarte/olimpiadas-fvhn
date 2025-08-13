"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
<<<<<<< HEAD
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.Router)();
router.post("/users", users_controllers_1.createUser);
router.get("/users", users_controllers_1.getUser);
router.put("/users", users_controllers_1.updateUser);
router.delete("/users", users_controllers_1.deleteUser);
=======
const user_controllers_1 = require("@controllers/user.controllers");
const router = (0, express_1.Router)();
router.post("/user", user_controllers_1.createUser);
router.get("/user", user_controllers_1.readUsers);
router.put("/user", user_controllers_1.updateUser);
router.delete("/user", user_controllers_1.deleteUser);
// Obtiene el ID mediante JSON en el body
router.get("/user/purchases", user_controllers_1.getAllPurchases);
//router.get("/user/login", );
router.post("/user/login", user_controllers_1.logInUser);
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
exports.default = router;
