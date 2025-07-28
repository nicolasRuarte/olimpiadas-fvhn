import { Request, Response } from "express";
import { createErrorMessage } from "@functionality/errorMessages";
import {
    createRatingService,
    readAllRatingsService,
    readRatingByIdsService,
    updateRatingService,
    deleteRatingService
} from "@services/rating.services";

export async function createRating(req: Request, res: Response) {
    const { serviceId, userDni } = req.body;

    try {
        const newRating = await createRatingService(req.body);

        console.error("Creando rating");
        res.status(200).send(newRating);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}

export async function readRatings(req: Request, res: Response) {
    try {
        const ratings = await readAllRatingsService();

        console.log("Leyendo todos los ratings");
        res.status(200).send(ratings);
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}

export async function updateRating(req: Request, res: Response) {
    try {
        const result = await updateRatingService(req.body);

        console.log("Actualizando rating");
        res.send(result);
    } catch(error) {
        console.error(error);
        res.send(createErrorMessage(error as string));
    }
}

export async function deleteRating(req: Request, res: Response) {
    try {
        const rating = deleteRatingService(req.body);

        console.log("Borrando rating");
        res.send(rating);
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as string));
    }
}
