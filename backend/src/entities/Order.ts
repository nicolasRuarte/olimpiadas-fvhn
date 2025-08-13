import {  Entity, BaseEntity,  OneToMany, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import Item from "./Item";
import User from "@entities/User";

@Entity()
export default class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Item, (item) => item.order)
    items: Item[];

    @ManyToOne(() => User, (user) => user.orders)
    user: User;
    
    @Column({ default: false })
    isBought: boolean
}
