import Rating from "@entities/Rating";
import RatingRepository from "@repositories/rating.repository";
import { DeleteResult, UpdateResult } from "typeorm";
import { validateNumberId, validateStringId } from "@functionality/validation";

export const createRatingService = async (data: { userId: string, serviceId: number, rating: number }) => {
    return await RatingRepository.createRating(data);
}

export const readAllRatingsService = async (): Promise<Rating[]> => {
    return await RatingRepository.readAllRatings();
}

export const readRatingByIdsService = async (ids: { userId: string, serviceId: number }): Promise<Rating> => {
    if (!validateStringId(ids.userId)) throw new Error("invalid-string-id");
    if (!validateNumberId(ids.serviceId)) throw new Error("invalid-number-id");

    return await RatingRepository.readRatingByIds(ids);
}

export const updateRatingService = async (ids: Partial<Rating>): Promise<void> => {
}

export const deleteRatingService = async (ids: Partial<Rating>): Promise<void> => {
}
