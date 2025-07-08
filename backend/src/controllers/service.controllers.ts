import { Request, Response } from "express";
import { Service } from "../entities/Service";
import { AppDataSource } from "../db";
import { validateNumberId } from "../validation";

export async function createService(req: Request, res: Response) {
    const { name, description, price } = req.body;

    const newService = new Service;
    newService.name = name;
    newService.description = description;
    newService.price = price;

    const dataManager = AppDataSource.manager;

    try {
        await dataManager.save(newService);
        res.status(200).send("Servicio creado");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error al crear servicio");
    }
}

// De momento solo lee por ID
// Si ID vale "-1" se devuelven todos los valores de la tabla Service
export async function readService(req: Request, res: Response) {
    const selectAllFlag = -1;
    const selectedId = parseInt(req.params.id) || selectAllFlag;
    if (!validateNumberId(selectedId)) {
        res.status(400).send("Por favor ingrese un ID de servicio válido");
        return;
    }

    const dataManager = AppDataSource.manager;

    try {
        let serviceFound;

        if (selectedId === selectAllFlag) {
            serviceFound = await dataManager.find(Service, { order: { id: "ASC" }});
            res.status(200).send(serviceFound);
            return;
        }

        serviceFound = await dataManager.findOne(Service, { where: { id: selectedId } })
        if (serviceFound === null) throw new Error("El servicio solictado no existe");

        res.status(200).send(serviceFound);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error al leer servicio/s");
    }
}

export async function updateService(req: Request, res: Response) {
    const selectedId = parseInt(req.params.id);
    const updateParameters = req.body;
    if (selectedId === undefined || typeof selectedId !== "number") {
        res.status(400).send("Por favor solicite un ID válido");
        return;
    }

    const  dataManager = AppDataSource.manager;

    try {
        await dataManager.update(Service, { id: selectedId }, updateParameters)
        res.status(200).send("Servicio actualizado");
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}

export async function deleteService(req: Request, res: Response) {
    const selectedId = parseInt(req.params.id);
    if (selectedId === undefined || selectedId === null || typeof selectedId !== "number") {
        res.status(400).send("Por favor solicite un ID válido");
        return;
    }

    const dataManager = AppDataSource.manager;

    try {
        await dataManager.delete(Service, { id: selectedId })

        res.status(200).send("Servicio borrado");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error al borrar");
    }
}
