import { Request, Response } from "express";
import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { AppDataSource } from "../db";
import { validateStringId } from "../validation";


export async function createUser(req: Request, res: Response) {
    const { dni, surname, names, email, password, phone_number } = req.body;

    if (!validateStringId(dni)) {
        res.send("Por favor elija un DNI válido");
        return;
    }

    if (await User.findOne({ where: { dni: dni }}) !== null) {
        res.send("Usuario ya existe");
        return;
    }

    const manager = AppDataSource.manager;

    const newOrder = new Order;
    newOrder.id = dni;

    try {
        await manager.save(newOrder);
        
        const newUser = new User;
        newUser.dni = dni;
        newUser.surname = surname;
        newUser.names = names;
        newUser.email = email;
        newUser.password = password;
        newUser.phone_number = phone_number;
        newUser.order = newOrder;

        console.log(`Creando usuario ${newUser} con orden ${newOrder}`);
        await manager.save(newUser);

        res.send("Usuario creado");
    } catch (error) {
        console.error(error);
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
