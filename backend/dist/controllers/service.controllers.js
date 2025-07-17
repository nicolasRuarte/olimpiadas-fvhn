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
exports.createService = createService;
exports.readService = readService;
exports.updateService = updateService;
exports.deleteService = deleteService;
const Service_1 = require("@entities/Service");
const db_1 = require("../db");
const validation_1 = require("@functionality/validation");
function createService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, price } = req.body;
        const newService = new Service_1.Service;
        newService.name = name;
        newService.description = description;
        newService.price = price;
        const dataManager = db_1.AppDataSource.manager;
        try {
            yield dataManager.save(newService);
            res.status(200).send(newService);
        }
        catch (error) {
            console.error(error);
            res.status(400).send("Error");
        }
    });
}
// De momento solo lee por ID
// Si ID vale "-1" se devuelven todos los valores de la tabla Service
function readService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectAllFlag = -1;
        const selectedId = parseInt(req.params.id) || selectAllFlag;
        if (!(0, validation_1.validateNumberId)(selectedId)) {
            res.status(400).send("Por favor ingrese un ID de servicio válido");
            return;
        }
        const dataManager = db_1.AppDataSource.manager;
        try {
            let serviceFound;
            if (selectedId === selectAllFlag) {
                serviceFound = yield dataManager.find(Service_1.Service, { order: { id: "ASC" } });
                res.status(200).send(serviceFound);
                return;
            }
            serviceFound = yield dataManager.findOne(Service_1.Service, { where: { id: selectedId } });
            if (serviceFound === null)
                throw new Error("El servicio solictado no existe");
            res.status(200).send(serviceFound);
        }
        catch (error) {
            console.error(error);
            res.status(400).send("Error al leer servicio/s");
        }
    });
}
function updateService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectedId = parseInt(req.params.id);
        const updateParameters = req.body;
        if (selectedId === undefined || typeof selectedId !== "number") {
            res.status(400).send("Por favor solicite un ID válido");
            return;
        }
        const dataManager = db_1.AppDataSource.manager;
        try {
            yield dataManager.update(Service_1.Service, { id: selectedId }, updateParameters);
            res.status(200).send("Servicio actualizado");
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
    });
}
function deleteService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectedId = parseInt(req.params.id);
        if (selectedId === undefined || selectedId === null || typeof selectedId !== "number") {
            res.status(400).send("Por favor solicite un ID válido");
            return;
        }
        const dataManager = db_1.AppDataSource.manager;
        try {
            yield dataManager.delete(Service_1.Service, { id: selectedId });
            res.status(200).send("Servicio borrado");
        }
        catch (error) {
            console.error(error);
            res.status(400).send("Error al borrar");
        }
    });
}
