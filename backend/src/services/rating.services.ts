import Rating from "@entities/Rating";
import RatingRepository from "@repositories/rating.repository";
import { DeleteResult, UpdateResult } from "typeorm";
import { validateNumberId, validateStringId } from "@functionality/validation";

export const createRatingService = async (data: Partial<Rating>) => {
    return await RatingRepository.createRating(data);
}

export const readAllRatingsService = async (): Promise<Rating[]> => {
    return await RatingRepository.readAllRatings();
}

export const readRatingByIdsService = async (ids: Partial<Rating>): Promise<Rating> => {
    if (ids.userDni === undefined || ids.serviceId === undefined) throw new Error("Falta id de usuario o id de servicio del rating");

    if (!validateStringId(ids.userDni) || !validateNumberId(ids.serviceId)) throw new Error("invalid-id");

    return await RatingRepository.readRatingByIds(ids);
}

export const updateRatingService = async (ids: Partial<Rating>): Promise<UpdateResult> => {
    if (ids.userDni === undefined || ids.serviceId === undefined) throw new Error("Falta id de usuario o id de servicio del rating");

    if (!validateStringId(ids.userDni) || !validateNumberId(ids.serviceId)) throw new Error("invalid-id");

    return await RatingRepository.updateRating(ids)
}

export const deleteRatingService = async (ids: Partial<Rating>): Promise<DeleteResult> => {
    if (ids.userDni === undefined || ids.serviceId === undefined) throw new Error("Falta id de usuario o id de servicio del rating");

    if (!validateStringId(ids.userDni) || !validateNumberId(ids.serviceId)) throw new Error("invalid-id");

    return await RatingRepository.deleteRating(ids);
}
