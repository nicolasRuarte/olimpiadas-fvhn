import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
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
        res.send(createErrorMessage(error as Error));
    }
}


export async function readServiceControlller(req: Request, res: Response) {
    const selectAllFlag = -1;
    const id = req.body ? req.body : selectAllFlag;

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
        res.status(400).send(createErrorMessage(error as Error));
    }
}

// Update parameters es un objeto que incluye los nombres de la propiedad a cambiar y el valor al que se la quiere actualizar
export async function updateServiceController(req: Request, res: Response) {
    let updateParameters = req.body ? req.body : "awawawawaw";

    try {
        const updatedService = await updateServiceService(updateParameters);

        console.log("Actualizando servicio");
        res.status(200).send(updatedService);
    } catch (error) {
        console.error(error);
        res.status(400).send(error as Error);
    }
}


export async function deleteServiceController(req: Request, res: Response) {
    const id = req.body ? req.body.id : "wawawawa";

    try {
        const deleteResult = await deleteServiceService(id);

        console.log("Borrando servicio");
        res.status(200).send(deleteResult);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as Error));
    }
}
