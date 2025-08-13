import { Request, Response } from "express";
import { AppDataSource } from "../db";
<<<<<<< HEAD
import { Rating } from "../entities/Rating";
import { Service } from "../entities/Service";
import { validateNumberId, validateStringId } from "../validation";
import { User } from "../entities/User";
=======
import { Rating } from "@entities/Rating";
import { Service } from "@entities/Service";
import { validateNumberId, validateStringId } from "@functionality/validation";
import { User } from "@entities/User";
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

export async function createRating(req: Request, res: Response) {
    let sId = req.query.sId as string;
    const serviceId = parseInt(sId);

    const r = req.query.r as string;
    const rating = parseInt(r);

    const userDni = req.query.uId as string;

    if (!validateNumberId(serviceId) || !validateStringId(userDni)) {
        console.error("Id de servicio para calificar inválido");
        return;
    }

<<<<<<< HEAD


=======
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    const manager = AppDataSource.manager;

    try {
        const newRating = new Rating;
        newRating.rating = rating;
        await manager.save(newRating);

        const serviceRated = await manager.findOne(Service, { where: { id: serviceId }, relations: { ratings: true } });
        // findOne() retorna null si no lo encuentra
<<<<<<< HEAD
        if (serviceRated === null) {
            throw new Error("El servicio que se quiere calificar no existe");
        }
=======
        if (serviceRated === null) throw new Error("El servicio que se quiere calificar no existe");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

        if (serviceRated.ratings === undefined) {
            serviceRated.ratings = [ newRating ];
        } else {
            serviceRated.ratings.push(newRating);
        }

        await manager.save(serviceRated);


        const user = await manager.findOne(User, { where: { dni: userDni }, relations: { ratings: true } });
        // findOne() retorna null si no lo encuentra
<<<<<<< HEAD
        if (user === null) {
            throw new Error("El usuario que ingresa la calificación no existe");
        }
=======
        if (user === null) throw new Error("El usuario que ingresa la calificación no existe");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

        if (user.ratings === undefined) {
            user.ratings = [ newRating ];
        } else {
            user.ratings.push(newRating);
        }

        await manager.save(user);

<<<<<<< HEAD
        res.send({ serviceRated: serviceRated.name, ratingUser: user.names, rating: newRating });
    } catch (error) {
        console.error(error);
=======
        res.status(200).send({ serviceRated: serviceRated.name, ratingUser: user.names, rating: newRating });
    } catch (error) {
        console.error(error);
        res.status(400).send();
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    }
}

export async function readRatings(req: Request, res: Response) {
    const manager = AppDataSource.manager;

<<<<<<< HEAD
    const ratings = await manager.find(Rating, { relations: { user: true, service: true }})

    res.send(ratings);
=======
    try {
        const ratings = await manager.find(Rating, { relations: { user: true, service: true }})

        res.status(200).send(ratings);
    } catch (error) {
        console.error(error);
        res.status(400).send();       
    }


>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
}

export async function updateRating(req: Request, res: Response) {
    res.send("Rating actualizado");
}

export async function deleteRating(req: Request, res: Response) {
    res.send("Rating borrado");
}
