import Rating from "@entities/Rating";
import RatingRepository from "@repositories/rating.repository";
import { DeleteResult, UpdateResult } from "typeorm";

export const createRatingService = async (data: Partial<Rating>) => {
    return await RatingRepository.createRating(data);
}

export const readAllRatingsService = async (): Promise<Rating[]> => {
    return await RatingRepository.readAllRatings();
}

export const readRatingByIdsService = async (data: Partial<Rating>): Promise<Rating> => {
    return await RatingRepository.readRatingByIds(data);
}

export const updateRatingService = async (data: Partial<Rating>): Promise<UpdateResult> => {
    return await RatingRepository.updateRating(data)
}

export const deleteRatingService = async (ids: Partial<Rating>): Promise<DeleteResult> => {
    return await RatingRepository.deleteRating(ids);
}
