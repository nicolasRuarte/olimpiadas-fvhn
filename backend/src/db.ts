import { DataSource } from "typeorm";
import { User } from "./entities/User.ts";
import { Order } from "./entities/Order.ts";
import { OrderDetail } from "./entities/OrderDetail.ts";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    port: 5432,
    database: "pagina_vuelos",
    entities: [ User, Order, OrderDetail ],
    logging: true,
    synchronize: true
});
