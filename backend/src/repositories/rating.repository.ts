import { AppDataSource } from "@root/db";
import Rating from "@entities/Rating";
import { readServiceByIdService } from "@services/service.services";
import userRepository from "./user.repository";
import serviceRepository from "./service.repository";

const ratingRepository = AppDataSource.getRepository(Rating).extend({
    async createRating(data: { userId: string, serviceId: number, rating: number }): Promise<Rating> {
        //const user = userdni
        //if user.items !includes service with service id
        const user = await userRepository.findOneBy({ dni: data.userId });
        if (!user) throw new Error("not-found");
        const service = await readServiceByIdService(data.serviceId as number);
        if (!service) throw new Error("not-found");

        const newRating = this.create();
        newRating.rating = data.rating;
        newRating.user = user;
        newRating.service = service;

        await userRepository.addRatingToUser(newRating);
        await serviceRepository.addRatingToService(newRating);

        return await this.save(newRating);
    },

    async readRatingByIds(data: { userId: string, serviceId: number }): Promise<Rating> {

        const rating = await this
        .createQueryBuilder("rating")
        .leftJoinAndSelect("rating.user", "user")
        .leftJoinAndSelect("rating.service", "service")
        .where("user.dni = :userId", { userId: data.userId })
        .andWhere("service.id = :serviceId", { serviceId: data.serviceId })
        .getOne()
        if (!rating) throw new Error("not-found");

        return rating;
    },

    async readAllRatings(): Promise<Rating[]> {
        return this.find();
    },

    async updateRating(updatedRating: { userId: string, serviceId: number, rating: number }): Promise<void> {
    },

    async deleteRating(ids: { userId: string, serviceId: number }): Promise<{ message: string, statusCode: number }> {
        await this.delete({ user: { dni: ids.userId }, service: { id: ids.serviceId }});

        return { message: "Objeto borrado", statusCode: 201 };
    }
});

export default ratingRepository;
