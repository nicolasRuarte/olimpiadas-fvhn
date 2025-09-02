import { DataSource } from "typeorm";
import User from "@entities/User";
import Order from "@entities/Order";
import OrderDetail from "@entities/OrderDetail";
import Rating from "@entities/Rating";
import Service from "@entities/Service";
import Item from "@entities/Item";
import { DB_NAME, DB_PORT, DB_URL, DB_HOST, DB_PASSWORD, DB_USERNAME } from "./dbconfig";

export const AppDataSource = new DataSource({
    type: "postgres",
    //url: DB_URL,
    //ssl: {
    //rejectUnauthorized: false,
    //},
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: (<number>DB_PORT),
    database: DB_NAME,
    entities: [ User, Order, OrderDetail, Service, Rating, Item ],
    logging: true,
    synchronize: true,
    dropSchema: true
});
