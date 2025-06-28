import { Column, Entity, BaseEntity, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Order } from "./Order.ts";
import { OrderDetail } from "./OrderDetail.ts";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    dni: string;

    @Column()
    surname: string;

    @Column()
    names: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone_number: string;

    @OneToOne(() => Order, (order) => order.dni)
    @JoinColumn()
    order: Order;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.user)
    orderDetails: OrderDetail[];
}
