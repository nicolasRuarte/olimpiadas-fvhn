import Rating from "@entities/Rating";
import RatingRepository from "@repositories/rating.repository";
import { validateNumberId, validateStringId } from "@functionality/validation";

export const createRatingService = async (data: { userId: string, serviceId: number, rating: number }) => {
    if (data.rating > 5 || data.rating < 0) throw new Error("El valor del rating se encuentra fuera del intervalo aceptado");

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

export const deleteRatingService = async (ids: { userId: string, serviceId: number }): Promise<{ message: string, statusCode: number }> => {
    return await RatingRepository.deleteRating(ids);
}
