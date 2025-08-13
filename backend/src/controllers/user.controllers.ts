import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createUserService,
    getAllUsersService,
    readUserByDniService,
    updateUserService,
    deleteUserService
} from "@services/user.services";
import { validateBody } from "@functionality/validation";

// CRUD OPERATIONS -----------------------------------------
export async function createUserController(req: Request, res: Response): Promise<void> {
    const data = validateBody(req.body) ? req.body : undefined;

    try {
        if (!data) throw new Error("empty-body");

        const newUser = await createUserService(data);

        console.log("Creando nuevo usuario");
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode).send(errorData.message);
    }
}


export async function readUsersController(req: Request, res: Response) {
    const selectAllFlag = -1;
    const dni = validateBody(req.body) ? req.body.dni : selectAllFlag;
    console.log("BODY: ", req.body)

    try {
        let user;
        if (dni === selectAllFlag) {
            user = await getAllUsersService();
        } else {
            user = await readUserByDniService(dni);
        }

        console.log("Devolviendo usuario/s");
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as Error));
    }
}

export async function updateUserController(req: Request, res: Response) {
    const dni = req.body.dni ? req.body.dni : undefined;
    const data = req.body.data ? req.body.data : undefined;

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
