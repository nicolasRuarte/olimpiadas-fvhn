import { Request, Response } from "express";
<<<<<<< HEAD
import { Service } from "../entities/Service";
import { AppDataSource } from "../db";
import { validateNumberId } from "../validation";
=======
import { Service } from "@entities/Service";
import { AppDataSource } from "../db";
import { validateNumberId } from "@functionality/validation";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

export async function createService(req: Request, res: Response) {
    const { name, description, price } = req.body;

    const newService = new Service;
    newService.name = name;
    newService.description = description;
    newService.price = price;

    const dataManager = AppDataSource.manager;

    try {
        await dataManager.save(newService);
<<<<<<< HEAD
        res.send("Servicio creado");
    } catch (error) {
        console.error(error);
        res.send("Error al crear servicio");
=======
        res.status(200).send(newService);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}

// De momento solo lee por ID
// Si ID vale "-1" se devuelven todos los valores de la tabla Service
export async function readService(req: Request, res: Response) {
    const selectAllFlag = -1;
    const selectedId = parseInt(req.params.id) || selectAllFlag;
    if (!validateNumberId(selectedId)) {
<<<<<<< HEAD
        res.send("Por favor ingrese un ID de servicio válido");
=======
        res.status(400).send("Por favor ingrese un ID de servicio válido");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
        return;
    }

    const dataManager = AppDataSource.manager;

    try {
        let serviceFound;

        if (selectedId === selectAllFlag) {
            serviceFound = await dataManager.find(Service, { order: { id: "ASC" }});
<<<<<<< HEAD
            res.send(serviceFound);
=======
            res.status(200).send(serviceFound);
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
            return;
        }

        serviceFound = await dataManager.findOne(Service, { where: { id: selectedId } })
<<<<<<< HEAD
        if (serviceFound === null){
            res.send("El servicio solicitado no existe");
            return;
        } 

        res.status(200).send(serviceFound);
    } catch (error) {
        console.error(error);
        res.send("Error al leer servicio/s");
=======
        if (serviceFound === null) throw new Error("El servicio solictado no existe");

        res.status(200).send(serviceFound);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error al leer servicio/s");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}

export async function updateService(req: Request, res: Response) {
    const selectedId = parseInt(req.params.id);
    const updateParameters = req.body;
    if (selectedId === undefined || typeof selectedId !== "number") {
<<<<<<< HEAD
        res.send("Por favor solicite un ID válido");
=======
        res.status(400).send("Por favor solicite un ID válido");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
        return;
    }

    const  dataManager = AppDataSource.manager;

    try {
        await dataManager.update(Service, { id: selectedId }, updateParameters)
<<<<<<< HEAD
        res.send("Servicio actualizado");
    } catch (error) {
        console.error(error);
        res.send("Error al actualizar");
=======
        res.status(200).send("Servicio actualizado");
    } catch (error) {
        console.error(error);
        res.status(400).send();
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}

export async function deleteService(req: Request, res: Response) {
    const selectedId = parseInt(req.params.id);
    if (selectedId === undefined || selectedId === null || typeof selectedId !== "number") {
<<<<<<< HEAD
        res.send("Por favor solicite un ID válido");
=======
        res.status(400).send("Por favor solicite un ID válido");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
        return;
    }

    const dataManager = AppDataSource.manager;

    try {
        await dataManager.delete(Service, { id: selectedId })

<<<<<<< HEAD
        res.send("Servicio borrado");
    } catch (error) {
        console.error(error);
        res.send("Error al borrar");
=======
        res.status(200).send("Servicio borrado");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error al borrar");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}
