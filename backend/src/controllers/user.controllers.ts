import { Request, Response } from "express";
import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { AppDataSource } from "../db";
import { validateStringId, validateUserData } from "../validation";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config";


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


    try {
        loginData = validateUserData(loginData);
        console.log(typeof loginData);
        console.log(loginData);
        
        const newUser = new User;
        newUser.dni = loginData.dni;
        newUser.surname = loginData.surname;
        newUser.names = loginData.names;
        newUser.email = loginData.email;
        newUser.password = await bcrypt.hash(loginData.password, SALT_ROUNDS);
        newUser.phone_number = loginData.phone_number;

        const newOrder = new Order;
        newOrder.id = loginData.dni;
        newUser.order = newOrder;
        await manager.save(newOrder);

        console.log(`Creando usuario ${newUser} con orden ${newOrder}`);
        await manager.save(newUser);

        res.send("Usuario creado");
    } catch (error) {
        console.error(error);
        res.send("Error al crear usuario");
    }
    
}

export function readUser(req: Request, res: Response) {
    res.send("Usuario devuelto");
}

export function updateUser(req: Request, res: Response) {
    res.send("Usuario actualizado");
}

export function deleteUser(req: Request, res: Response) {
    res.send("Usuario borrado");
}
