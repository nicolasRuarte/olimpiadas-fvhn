"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.readUsers = readUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.logInUser = logInUser;
exports.getAllPurchases = getAllPurchases;
const User_1 = require("@entities/User");
const Order_1 = require("@entities/Order");
const db_1 = require("../db");
const validation_1 = require("@functionality/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// CRUD OPERATIONS -----------------------------------------
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let loginData = req.body;
        if (!(0, validation_1.validateStringId)(loginData.dni)) {
            res.send("Por favor elija un DNI válido");
            return;
        }
        if ((yield User_1.User.findOne({ where: { dni: loginData.dni } })) !== null) {
            res.send("Usuario ya existe");
            return;
        }
        const manager = db_1.AppDataSource.manager;
        try {
            loginData = (0, validation_1.validateUserData)(loginData);
            const newUser = new User_1.User;
            newUser.dni = loginData.dni;
            newUser.surname = loginData.surname;
            newUser.names = loginData.names;
            newUser.email = loginData.email;
            newUser.password = yield bcrypt_1.default.hash(loginData.password, config_1.SALT_ROUNDS);
            newUser.phone_number = loginData.phone_number;
            yield manager.save(newUser);
            const newOrder = new Order_1.Order;
            newOrder.id = loginData.dni;
            newUser.order = newOrder;
            yield manager.save(newOrder);
            res.status(201).send({ newUser, newOrder });
            console.log("Creando nuevo usuario");
        }
        catch (error) {
            console.error(error);
            res.status(400).send("Error al crear usuario");
        }
    });
}
function readUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const manager = db_1.AppDataSource.manager;
        try {
            const result = yield manager.find(User_1.User, { relations: { orderDetails: true },
                select: { dni: true, names: true, surname: true, email: true },
                order: { dni: "ASC" } });
            res.status(200).send(result);
            console.log("Leyendo usuario");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.access_token;
            if (token === undefined || token === undefined)
                throw new Error("Acceso denegado");
        }
        catch (error) {
            console.error(error);
            res.status(403).send("Acceso denegado");
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("Usuario borrado");
    });
}
// EXTRAS ----------------------------------------------------
function logInUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dni, email, password } = req.body;
        try {
            const manager = db_1.AppDataSource.manager;
            const userToLogIn = yield manager.findOne(User_1.User, { where: [{ dni: dni }, { email: email }] });
            if (userToLogIn === null)
                throw new Error("Usuario no existe");
            const isPasswordCorrect = yield bcrypt_1.default.compare(password, userToLogIn === null || userToLogIn === void 0 ? void 0 : userToLogIn.password);
            if (!isPasswordCorrect)
                throw new Error("La contraseña o el usuario son incorrectos");
            const role = userToLogIn.role;
            const token = jsonwebtoken_1.default.sign({ dni, role }, config_1.JWT_SECRET, {
                expiresIn: "24h"
            });
            const twentyFourHoursInSeconds = 1000 * 60 * 60 * 24;
            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: twentyFourHoursInSeconds
            }).status(200)
                .send({ dni, role, token });
            console.log("Loggeando usuario");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
function getAllPurchases(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.access_token;
            if (token === undefined || token === null)
                throw new Error("Acceso denegado");
            const data = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
            const manager = db_1.AppDataSource.manager;
            // Si se puede eliminar los any
            const user = yield manager.findOne(User_1.User, { where: { dni: data.dni }, relations: { orderDetails: true } });
            if (user === null)
                throw new Error("Usuario no existe");
            res.status(200).send(user.orderDetails);
            console.log("Devolviendo todas las compras del usuario");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
