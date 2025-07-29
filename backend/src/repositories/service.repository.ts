import { AppDataSource } from "@root/db";
import Service from "@entities/Service";
import { DeleteResult, UpdateResult } from "typeorm";

const serviceRepository = AppDataSource.getRepository(Service).extend({
    async createService(data: Partial<Service>): Promise<Service> {
        const newService = this.create(data);

        return await this.save(newService);
    },

    async readServiceById(id: number): Promise<Service> {
        const service = await this.findOneBy({ id: id });
        if (service === null) throw new Error("not-found");

        return service;
    },

    async readAllServices(): Promise<Service[]> {
        const services = await this.find();
        if (services === undefined) throw new Error("No hay ningún servicio registrado");

        return services;
    },

    async updateService(data: Partial<Service>): Promise<UpdateResult> {
        return await this.update({ id: data.id }, data);
    },

    async deleteService(id: number): Promise<DeleteResult> {
        return await this.delete({ id: id });
    }

});

export default serviceRepository;
