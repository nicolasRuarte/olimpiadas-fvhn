import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Order } from "./entities/Order";
import { OrderDetail } from "./entities/OrderDetail";
import { Rating } from "./entities/Rating";
import { Service } from "./entities/Service";
import { DATABASE_NAME, DB_PORT, HOST, PASSWORD, USERNAME,  } from "./dbconfig"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOST,
    username: USERNAME,
    password: PASSWORD,
    port: (<number>DB_PORT),
    database: DATABASE_NAME,
    entities: [ User, Order, OrderDetail, Service, Rating ],
    logging: true,
    synchronize: true 
});
