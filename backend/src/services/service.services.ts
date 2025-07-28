import Service from "@entities/Service";
import ServiceRepository from "@repositories/service.repository";
import { DeleteResult, UpdateResult } from "typeorm";

export const createServiceService = async (data: Partial<Service>): Promise<Service> => {
    return await ServiceRepository.createService(data);
}

export const readAllServicesService = async (): Promise<Service[]> => {
    return await ServiceRepository.readAllServices()
}

export const readServiceByIdService = async (id: number): Promise<Service> => {
    return await ServiceRepository.readServiceById(id)
}

export const updateServiceService = async (data: Partial<Service>): Promise<UpdateResult> => {
    return await ServiceRepository.updateService(data);
}

export const deleteServiceService = async (id: number): Promise<DeleteResult> => {
    return await ServiceRepository.deleteService(id);
}
