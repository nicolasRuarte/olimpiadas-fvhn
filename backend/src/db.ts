import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Order } from "./entities/Order";
import { OrderDetail } from "./entities/OrderDetail";
import { Rating } from "./entities/Rating";
import { Service } from "./entities/Service";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    port: 5432,
    database: "pagina_vuelos",
    entities: [ User, Order, OrderDetail, Service, Rating ],
    logging: true,
    synchronize: true
});
