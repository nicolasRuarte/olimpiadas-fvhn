import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import { validateBody, validateNumberId } from "@functionality/validation";
import {
    createServiceService,
    readAllServicesService,
    readServiceByIdService,
    updateServiceService,
    deleteServiceService
} from "@services/service.services";

export async function createServiceController(req: Request, res: Response) {
    try {
        const newService = await createServiceService(req.body);

        console.log("Creando servicio");
        res.status(201).send(newService);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err);
    }
}


export async function readServiceControlller(req: Request, res: Response) {
    const selectAllFlag = "all";
    const id = validateBody(req.body) ? req.body.id : selectAllFlag;

    try {
        let services;
        if (id === selectAllFlag) {
            services = await readAllServicesService();
        } else {
            services = await readServiceByIdService(id);
        }

        console.log("Leyendo servicio/s");
        res.status(200).send(services);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err);
    }
}

// Update parameters es un objeto que incluye los nombres de la propiedad a cambiar y el valor al que se la quiere actualizar
export async function updateServiceController(req: Request, res: Response) {
    try {
        const updatedData = validateBody(req.body) ? req.body.updatedData : null;
        const id = validateNumberId(req.body.id) ? req.body.id : null

        if (updatedData === null) throw new Error("empty-body");

        const updatedService = await updateServiceService(id, updatedData);

        console.log("Actualizando servicio");
        res.status(200).send(updatedService);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err);
    }
}


export async function deleteServiceController(req: Request, res: Response) {
    const id = validateBody(req.body) ? req.body.id : null;

    try {
        if (id === null) throw new Error("invalid-id");

        const deleteResult = await deleteServiceService(id);

        console.log("Borrando servicio");
        res.status(200).send(deleteResult);
    } catch (error) {
        console.error(error);
        const err = createErrorMessage(error as Error);
        res.status(err.statusCode).send(err);
    }
}
