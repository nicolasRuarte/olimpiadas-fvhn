import { BaseEntity,  Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Service from "./Service";
import Order from "./Order";
import OrderDetail from "./OrderDetail";

@Entity()
export default class Item extends BaseEntity {
    @PrimaryColumn({ name: "service_id", type: "number" })
    @ManyToOne(() => Service, (service) => service.items)
    @JoinColumn({ name: "service_id" })
    service: Service;

    @PrimaryColumn({ name: "order_id", type: "string" })
    @ManyToOne(() => Order, (order) => order.items)
    @JoinColumn({ name: "order_id" })
    order: Order;

    @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.items)
    orderDetail: OrderDetail;

    //@PrimaryColumn("string")
    //orderId: string;

    //@PrimaryColumn("int")
    //serviceId: number;

    @Column({ default: 1 })
    quantity: number;

}
