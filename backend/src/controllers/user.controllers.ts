import { Request, Response } from "express";
import { User } from "@entities/User";
import { Order } from "@entities/Order";
import { validateStringId, validateUserData } from "@functionality/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS, JWT_SECRET } from "@root/config";
import { createErrorMessage } from "@functionality/errorMessages";
import { AppDataSource } from "@root/db";

const userRepository = AppDataSource.getRepository(User);
const orderRepository = AppDataSource.getRepository(Order);

async function saveUser(userData: User) {

    const newUser = new User;
    newUser.dni = userData.dni;
    newUser.surname = userData.surname;
    newUser.names = userData.names;
    newUser.email = userData.email;
    newUser.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
    newUser.phone_number = userData.phone_number;

    await userRepository.save(newUser);
    
    const newOrder = new Order;
    newOrder.id = userData.dni;
    console.log(orderRepository);
    orderRepository.save(newOrder);

    newUser.order = newOrder;
    userRepository.save(newUser);

    return { newUser, newOrder };
}

// CRUD OPERATIONS -----------------------------------------
export async function createUser(req: Request, res: Response) {
    let userData = req.body;

    try {
        if (!validateStringId(userData.dni)) {
            throw new Error("invalid-id")
        }
        if (await User.findOne({ where: { dni: userData.dni }}) !== null) {
            throw new Error("not-found");
        }

        userData = validateUserData(userData);
        const newUser = await saveUser(userData);

        console.log("Creando nuevo usuario");
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
    
}

async function getUser(dni: string) {
    const user = await userRepository.findOneBy( { dni: dni } );

    return user;
}

export async function readUsers(req: Request, res: Response) {
    const { dni } = req.body;

    try {
        const user = getUser(dni);

        console.log("Devolviendo usuario");
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const token = req.cookies.access_token;
        if (token === undefined || token === undefined) throw new Error("Acceso denegado");
       
    } catch (error) {
        console.error(error);
        res.status(403).send("Acceso denegado");
    }
}

export async function deleteUser(req: Request, res: Response) {
    res.send("Usuario borrado");
}

// EXTRAS ----------------------------------------------------
export async function logInUser(req: Request, res: Response) {
    const { dni, email, password } = req.body;

    try {
        const userToLogIn = await userRepository.findOne({ where: [ { dni: dni }, { email: email } ] });
        if (userToLogIn === null) throw new Error("not-found");

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
        }).status(200)
        .send({ dni, role, token });

        console.log("Loggeando usuario");
        res.status(200).send({ message: "Usuario loggeado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}

export async function getAllPurchases(req: Request, res: Response) {
    try {
        const token = req.cookies.access_token;
        if (token === undefined || token === null) throw new Error("access-denied");

        const data = jwt.verify(token, JWT_SECRET);


        // Si se puede eliminar los any
        const user = await userRepository.findOne({ where: { dni: (<any>data).dni }, relations: { orderDetails: true } });
        if (user === null) throw new Error("not-found");

        res.status(200).send(user.orderDetails);
        console.log("Devolviendo todas las compras del usuario");
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as string));
    }
}
