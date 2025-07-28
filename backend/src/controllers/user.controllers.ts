import { Request, Response } from "express";
import { validateStringId, validateUserData } from "@functionality/validation";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createUserService,
    getAllUsersService,
    getUserByDniService,
    updateUserService,
    deleteUserService
} from "@services/user.services";

// CRUD OPERATIONS -----------------------------------------
export async function createUserController(req: Request, res: Response): Promise<void> {
    try {
        const newUser = await createUserService(req.body);

        console.log("Creando nuevo usuario");
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}


export async function readUsersController(req: Request, res: Response) {
    const { dni } = req.body;
    const selectAllFlag = -1;

    try {
        let user;
        if (dni === selectAllFlag) {
            user = getAllUsersService()
        } else {
            user = getUserByDniService(dni);
        }

        console.log("Devolviendo usuario/s");
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}

export async function updateUser(req: Request, res: Response) {
    const { dni } = req.body;
    try {
        const result = deleteUserService(dni);

        console.log("Usuario borrado");
        res.send(result);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as string));
    }
}

export async function deleteUser(req: Request, res: Response) {
    res.send("Usuario borrado");
}
