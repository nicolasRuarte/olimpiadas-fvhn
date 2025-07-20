import { Request, Response } from "express";
import { Service } from "@entities/Service";
import { AppDataSource } from "../db";
import { validateNumberId } from "@functionality/validation";

const serviceRepository = AppDataSource.getRepository(Service);

export async function createServiceOnServer(serviceData: Service) {
    const { name, description, price } = serviceData;

    const newService = new Service;
    newService.name = name;
    newService.description = description;
    newService.price = price;

    serviceRepository.save(newService);

    return newService;
}

export async function createService(req: Request, res: Response) {
    try {
        const newService = await createServiceOnServer(req.body);
        res.status(201).send(newService);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error");
    }
}

// Si ID vale "-1" se devuelven todos los valores de la tabla Service
export async function readServiceFromServer(id: number) {
    const selectAllFlag = -1;

    if (id === selectAllFlag) {
        return await serviceRepository.find();
    }
    return await serviceRepository.findOneBy({ id: id });
}

export async function readService(req: Request, res: Response) {
    const selectAllFlag = -1;
    const selectedId = parseInt(req.params.id) || selectAllFlag;
    if (!validateNumberId(selectedId)) {
        res.status(400).send("Por favor ingrese un ID de servicio válido");
        return;
    }

    try {
        const foundService = await readServiceFromServer(selectedId);
        res.status(200).send(foundService);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error al leer servicio/s");
    }
}

export async function updateServiceOnServer(id: number, updateParameters: Service) {
    if (serviceRepository.findOneBy({ id: id }) === null) throw new Error("Service does not exist");

    return await serviceRepository.update({ id: id }, updateParameters);
}

// Update parameters es un objeto que incluye los nombres de la propiedad a cambiar y el valor al que se la quiere actualizar
export async function updateService(req: Request, res: Response) {
    const selectedId = parseInt(req.params.id);
    const updateParameters = req.body;
    if (selectedId === undefined || typeof selectedId !== "number") {
        res.status(400).send("Por favor solicite un ID válido");
        return;
    }

    try {
        const updatedService = await updateServiceOnServer(selectedId, updateParameters);
        res.status(200).send(updatedService);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error al actualizar servicio");
    }
}

export async function deleteServiceOnServer(id: number) {
    return await serviceRepository.delete({ id: id });
}

export async function deleteService(req: Request, res: Response) {
    const selectedId = parseInt(req.params.id);
    if (selectedId === undefined || selectedId === null || typeof selectedId !== "number") {
        res.status(400).send("Por favor solicite un ID válido");
        return;
    }

    try {
        const deleteResult = await deleteServiceOnServer(selectedId);
        res.status(200).send(deleteResult);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error al borrar");
    }
}
