"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Order_1 = require("./entities/Order");
const OrderDetail_1 = require("./entities/OrderDetail");
const Rating_1 = require("./entities/Rating");
const Service_1 = require("./entities/Service");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    port: 5432,
    database: "pagina_vuelos",
    entities: [User_1.User, Order_1.Order, OrderDetail_1.OrderDetail, Service_1.Service, Rating_1.Rating],
    logging: true,
    synchronize: true
});
