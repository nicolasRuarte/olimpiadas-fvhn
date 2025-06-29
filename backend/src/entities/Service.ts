import { Column, BaseEntity, Entity, PrimaryColumn, OneToMany, ManyToMany } from "typeorm";
import { Rating } from "./Rating";
import { Order } from "./Order";
import { OrderDetail } from "./OrderDetail";


@Entity()
export class Service extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ default: 0.0 })
    price: number;

    @OneToMany(() => Rating, (rating) => rating.service)
    ratings: Rating[];

    @ManyToMany(() => Order, (order) => order.items)
    orders: Order[];

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.items)
    orderDetails: OrderDetail[];
}
