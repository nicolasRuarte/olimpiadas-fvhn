import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createRatingService,
    readAllRatingsService,
    readRatingByIdsService,
    updateRatingService,
    deleteRatingService
} from "@services/rating.services";
import { validateBody } from "@functionality/validation";

export async function createRatingController(req: Request, res: Response) {
    const serviceId = validateBody(req.body) ? req.body.serviceId : undefined;
    const userId = validateBody(req.body) ? req.body.userId : undefined;
    const rating = validateBody(req.body) ? req.body.rating : undefined;

    try {
        if (!serviceId || !userId || !rating) throw new Error("empty-body");
        const newRating = await createRatingService({ userId, serviceId, rating });

        console.log("Creando rating");
        res.status(200).send(newRating);
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode).send(errorData);
    }
}

export async function readRatingsController(req: Request, res: Response) {
    const userDni = validateBody(req.body) ? req.body.userDni : undefined
    const serviceId = validateBody(req.body) ? req.body.serviceId : undefined

    try {
        let ratings;
        
        if (!userDni && !serviceId) {
            ratings = await readAllRatingsService();
        } else {
            if (!userDni) throw new Error("invalid-string-id");
            if (!serviceId) throw new Error("invalid-number-id");

            ratings = await readRatingByIdsService({ userId: userDni, serviceId: serviceId});
        }

        console.log("Leyendo todos los ratings");
        res.status(200).send(ratings);
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode).send(errorData);

    }
}

export async function updateRatingController(req: Request, res: Response) {
    const userDni = validateBody(req.body) ? req.body.userDni : undefined
    const serviceId = validateBody(req.body) ? req.body.serviceId : undefined

    try {
        if (!userDni || !serviceId) throw new Error("invalid-id");
        const result = await updateRatingService(req.body);

        console.log("Actualizando rating");
        res.send(result);
    } catch(error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode).send(errorData);
    }
}

export async function deleteRating(req: Request, res: Response) {
    const userId = validateBody(req.body) ? req.body.userId : undefined;
    const serviceId = validateBody(req.body) ? req.body.serviceId : undefined;
    try {
        if (!userId) throw new Error("invalid-string-id");
        if (!serviceId) throw new Error("invalid-number-id");
        const response = await deleteRatingService(req.body);

        console.log("Borrando rating");
        res.send(response);
    } catch (error) {
        console.error(error);
        const errorData = createErrorMessage(error as Error);
        res.status(errorData.statusCode).send(errorData);
    }
}
