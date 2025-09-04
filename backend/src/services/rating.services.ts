import Rating from "@entities/Rating";
import RatingRepository from "@repositories/rating.repository";
import { validateNumberId, validateRatingValue, validateStringId } from "@functionality/validation";

export const createRatingService = async (data: { userId: string, serviceId: number, rating: number }) => {
    if (!validateStringId(data.userId)) throw new Error("invalid-string-id");
    if (!validateNumberId(data.serviceId)) throw new Error("invalid-number-id");
    if (!validateRatingValue(data.rating)) throw new Error("El rating envíado es inválido");

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

export const updateRatingService = async (userDni: string, serviceId: number, rating: number): Promise<Rating> => {
    if (!validateStringId(userDni)) throw new Error("invalid-string-id");
    if (!validateNumberId(serviceId)) throw new Error("invalid-number-id");
    if (!validateRatingValue(rating)) throw new Error("El rating enviado es inválido");

    return await RatingRepository.updateRating(userDni, serviceId, rating);
}

export const deleteRatingService = async (ids: { userId: string, serviceId: number }): Promise<{ message: string, statusCode: number }> => {
    if (!validateStringId(ids.userId)) throw new Error("invalid-string-id");
    if (!validateNumberId(ids.serviceId)) throw new Error("invalid-number-id");

    return await RatingRepository.deleteRating(ids);
}
