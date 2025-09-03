import Service from "@entities/Service";
import ServiceRepository from "@repositories/service.repository";
import { DeleteResult, UpdateResult } from "typeorm";
import { validateNumberId, validateServiceData } from "@functionality/validation";

export const createServiceService = async (data: Partial<Service>): Promise<Service> => {
    if (!validateServiceData(data)) throw new Error("Alguno de los datos enviados es inválido");

    return await ServiceRepository.createService(data);
}

export const readAllServicesService = async (): Promise<Service[]> => {
    return await ServiceRepository.readAllServices();
}

export const readServiceByIdService = async (id: number): Promise<Service> => {
    if (!validateNumberId(id)) throw new Error("invalid-id");

    return await ServiceRepository.readServiceById(id)
}

export const updateServiceService = async (id: number, data: Partial<Service>): Promise<Service | null> => {
    if (!validateNumberId(id)) throw new Error("invalid-id");

    return await ServiceRepository.updateService(id, data);
}

export const deleteServiceService = async (id: number): Promise<DeleteResult> => {
    if (!validateNumberId(id)) throw new Error("invalid-id");

    return await ServiceRepository.deleteService(id);
}
