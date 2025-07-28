import { AppDataSource } from "@root/db";
import Rating from "@entities/Rating";
import { UpdateResult, DeleteResult } from "typeorm";

const ratingRepository = AppDataSource.getRepository(Rating).extend({
    async createRating(data: Partial<Rating>): Promise<Rating> {
        const newRating = this.create(data);

        return this.save(newRating);
    },

    async readRatingByIds(ratingData: Partial<Rating>): Promise<Rating> {
        const service = await this.findOneBy({ userDni: ratingData.userDni, serviceId: ratingData.serviceId });
        if (service === null) throw new Error("not-found");

        return service;
    },

    async readAllRatings(): Promise<Rating[]> {
        const services = await this.find();
        if (services === undefined) throw new Error("No hay ningún servicio registrado");

        return services;
    },

    async updateRating(updatedRating: Partial<Rating>): Promise<UpdateResult> {
        return await this.update({userDni: updatedRating.userDni, serviceId: updatedRating.serviceId }, updatedRating);
    },

    async deleteRating(ratingIds: Partial<Rating>): Promise<DeleteResult> {
        return await this.delete({ userDni: ratingIds.userDni, serviceId: ratingIds.serviceId });
    },
});

export default ratingRepository;
