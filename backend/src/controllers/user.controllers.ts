import { Request, Response } from "express";
<<<<<<< HEAD
import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { AppDataSource } from "../db";
import { validateStringId, validateUserData } from "../validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS, JWT_SECRET } from "../config";
=======
import { User } from "@entities/User";
import { Order } from "@entities/Order";
import { AppDataSource } from "@root/db";
import { validateStringId, validateUserData } from "@functionality/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS, JWT_SECRET } from "@root/config";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

// CRUD OPERATIONS -----------------------------------------
export async function createUser(req: Request, res: Response) {
    let loginData = req.body;

    if (!validateStringId(loginData.dni)) {
        res.send("Por favor elija un DNI válido");
        return;
    }
    if (await User.findOne({ where: { dni: loginData.dni }}) !== null) {
        res.send("Usuario ya existe");
        return;
    }

    const manager = AppDataSource.manager;

<<<<<<< HEAD

=======
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    try {
        loginData = validateUserData(loginData);
        
        const newUser = new User;
        newUser.dni = loginData.dni;
        newUser.surname = loginData.surname;
        newUser.names = loginData.names;
        newUser.email = loginData.email;
        newUser.password = await bcrypt.hash(loginData.password, SALT_ROUNDS);
        newUser.phone_number = loginData.phone_number;
        await manager.save(newUser);

        const newOrder = new Order;
        newOrder.id = loginData.dni;
        newUser.order = newOrder;
        await manager.save(newOrder);


<<<<<<< HEAD
        res.send({ newUser, newOrder});
    } catch (error) {
        console.error(error);
        res.send("Error al crear usuario");
=======
        res.status(201).send({ newUser, newOrder});
        console.log("Creando nuevo usuario");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error al crear usuario");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
    
}

export async function readUsers(req: Request, res: Response) {
<<<<<<< HEAD
    const manager = AppDataSource.manager;

        const result = await manager.find(User, 
                                        { relations: { orderDetails: true },
                                            select: { dni: true, names: true, surname: true, email: true },
                                            order: { dni: "ASC" } });

    res.send(result);
=======
    try {
        const manager = AppDataSource.manager;

        const result = await manager.find(User, 
                                        { relations: { orderDetails: true },
                                            select: { dni: true, names: true, surname: true, email: true },
                                            order: { dni: "ASC" } });

        res.status(200).send(result);
        console.log("Leyendo usuario");
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
}

export async function updateUser(req: Request, res: Response) {
    try {
        const token = req.cookies.access_token;
<<<<<<< HEAD
        if (token === undefined || token === undefined) {
            throw new Error("Acceso denegado");
        }

        console.log("Buen día");
    } catch (error) {
        console.error(error);
        res.status(403).send("Acceso denegado");
        
=======
        if (token === undefined || token === undefined) throw new Error("Acceso denegado");
       
    } catch (error) {
        console.error(error);
        res.status(403).send("Acceso denegado");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }

}

export async function deleteUser(req: Request, res: Response) {
    res.send("Usuario borrado");
}

// EXTRAS ----------------------------------------------------
export async function logInUser(req: Request, res: Response) {
    const { dni, email, password } = req.body;

    try {
        const manager = AppDataSource.manager;

        const userToLogIn = await manager.findOne(User, { where: [ { dni: dni }, { email: email } ] });
        if (userToLogIn === null) throw new Error("Usuario no existe");

        const isPasswordCorrect = await bcrypt.compare(password, userToLogIn?.password);
        if (!isPasswordCorrect) throw new Error("La contraseña o el usuario son incorrectos");

        const role: string = userToLogIn.role;
        const token = jwt.sign(
            { dni, role },
            JWT_SECRET,
            {
                expiresIn: "24h"
            });

        const twentyFourHoursInSeconds = 1000 * 60 * 60 * 24;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: twentyFourHoursInSeconds
<<<<<<< HEAD
        }).send({ dni, role, token });
    } catch (error) {
        console.error(error);
=======
        }).status(200)
        .send({ dni, role, token });

        console.log("Loggeando usuario");
    } catch (error) {
        console.error(error);
        res.status(400).send();
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}

export async function getAllPurchases(req: Request, res: Response) {

    try {
        const token = req.cookies.access_token;
<<<<<<< HEAD
        if (token === undefined || token === null) {
            throw new Error("Acceso denegado");
        }
=======
        if (token === undefined || token === null) throw new Error("Acceso denegado");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

        const data = jwt.verify(token, JWT_SECRET);

        const manager = AppDataSource.manager;

        // Si se puede eliminar los any
        const user = await manager.findOne(User, { where: { dni: (<any>data).dni }, relations: { orderDetails: true } });
<<<<<<< HEAD
        if (user === null) {
            throw new Error("Usuario no existe");
        }

        res.status(200).send(user.orderDetails);
        console.log("Devolviendo todas las compras del usuario");
    } catch (error) {
        console.error(error);
=======
        if (user === null) throw new Error("Usuario no existe");

        res.status(200).send(user.orderDetails);
        console.log("Devolviendo todas las compras del usuario");
    } catch (error) {
        console.error(error);
        res.status(400).send();
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}
