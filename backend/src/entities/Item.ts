import { BaseEntity,  Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import Service from "./Service";
import Order from "./Order";

@Entity()
export default class Item extends BaseEntity {
    @PrimaryColumn("string")
    orderId: string;

    @PrimaryColumn("int")
    serviceId: number;

    @Column({ default: 1 })
    quantity: number;

    @ManyToOne(() => Service, (service) => service.items)
    service: Service;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;
}
