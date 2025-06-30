import { Column, BaseEntity, Entity, OneToMany, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rating } from "./Rating";
import { Order } from "./Order";
import { OrderDetail } from "./OrderDetail";


@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ default: 0.0 })
    price: number;

    @OneToMany(() => Rating, (rating) => rating.service)
    ratings: Rating[];

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.items)
    orderDetails: OrderDetail[];
}
