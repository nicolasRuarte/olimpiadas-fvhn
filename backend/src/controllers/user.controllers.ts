import { Request, Response } from "express";
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
    const data = req.body ? req.body : undefined;

    try {
        if (data === undefined) throw new Error("empty-body");

        const newUser = await createUserService(req.body);

        console.log("Creando nuevo usuario");
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as Error));
    }
}


export async function readUsersController(req: Request, res: Response) {
    const selectAllFlag = -1;
    const dni = req.body ? req.body.dni : selectAllFlag;

    try {
        let user;
        if (dni === selectAllFlag) {
            user = await getAllUsersService();
        } else {
            user = await getUserByDniService(dni);
        }

        console.log("Devolviendo usuario/s");
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as Error));
    }
}

export async function updateUserController(req: Request, res: Response) {
    const dni = req.body ? req.body.dni : undefined;
    const data = req.body ? req.body.data : undefined;

    try {
        if (dni === undefined || data === undefined) throw new Error("empty-body");

        const result = await updateUserService(dni, data);

        console.log("Usuario borrado");
        res.send(result);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as Error));
    }
}

export async function deleteUserController(req: Request, res: Response) {
    res.send("Usuario borrado");
}
