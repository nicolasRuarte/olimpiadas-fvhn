import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Order } from "./entities/Order";
import { OrderDetail } from "./entities/OrderDetail";
import { Rating } from "./entities/Rating";
import { Service } from "./entities/Service";
<<<<<<< HEAD
import { DATABASE_NAME, DB_PORT, DATABASE_URL, HOST, PASSWORD, USERNAME } from "./dbconfig";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    ssl: {
    rejectUnauthorized: false,
    },
    host: HOST,
    username: USERNAME,
    password: PASSWORD,
    port: (<number>DB_PORT),
    database: DATABASE_NAME,
    entities: [ User, Order, OrderDetail, Service, Rating ],
    logging: true,
    synchronize: true
=======
import { DB_NAME, DB_PORT, DB_URL, HOST, PASSWORD, USERNAME } from "./dbconfig";

export const AppDataSource = new DataSource({
    type: "postgres",
    //url: DB_URL,
    //ssl: {
    //rejectUnauthorized: false,
    //},
    host: HOST,
    username: "postgres",
    password: PASSWORD,
    port: (<number>DB_PORT),
    database: DB_NAME,
    entities: [ User, Order, OrderDetail, Service, Rating ],
    logging: true,
    synchronize: true,
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
});
