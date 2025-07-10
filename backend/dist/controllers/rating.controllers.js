"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRating = createRating;
exports.readRatings = readRatings;
exports.updateRating = updateRating;
exports.deleteRating = deleteRating;
const db_1 = require("../db");
const Rating_1 = require("@entities/Rating");
const Service_1 = require("@entities/Service");
const validation_1 = require("@functionality/validation");
const User_1 = require("@entities/User");
function createRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let sId = req.query.sId;
        const serviceId = parseInt(sId);
        const r = req.query.r;
        const rating = parseInt(r);
        const userDni = req.query.uId;
        if (!(0, validation_1.validateNumberId)(serviceId) || !(0, validation_1.validateStringId)(userDni)) {
            console.error("Id de servicio para calificar inválido");
            return;
        }
        const manager = db_1.AppDataSource.manager;
        try {
            const newRating = new Rating_1.Rating;
            newRating.rating = rating;
            yield manager.save(newRating);
            const serviceRated = yield manager.findOne(Service_1.Service, { where: { id: serviceId }, relations: { ratings: true } });
            // findOne() retorna null si no lo encuentra
            if (serviceRated === null)
                throw new Error("El servicio que se quiere calificar no existe");
            if (serviceRated.ratings === undefined) {
                serviceRated.ratings = [newRating];
            }
            else {
                serviceRated.ratings.push(newRating);
            }
            yield manager.save(serviceRated);
            const user = yield manager.findOne(User_1.User, { where: { dni: userDni }, relations: { ratings: true } });
            // findOne() retorna null si no lo encuentra
            if (user === null)
                throw new Error("El usuario que ingresa la calificación no existe");
            if (user.ratings === undefined) {
                user.ratings = [newRating];
            }
            else {
                user.ratings.push(newRating);
            }
            yield manager.save(user);
            res.status(200).send({ serviceRated: serviceRated.name, ratingUser: user.names, rating: newRating });
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
function readRatings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const manager = db_1.AppDataSource.manager;
        try {
            const ratings = yield manager.find(Rating_1.Rating, { relations: { user: true, service: true } });
            res.status(200).send(ratings);
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
function updateRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("Rating actualizado");
    });
}
function deleteRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("Rating borrado");
    });
}
