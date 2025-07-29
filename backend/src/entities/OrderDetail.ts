import { Column, 
    Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, 
    OneToMany,
    OneToOne,
    JoinColumn} from "typeorm";
import User from "./User";
import Item from "@entities/Item";
import {
    IsDate,
    IsNumber,
    IsString
} from "class-validator";

@Entity()
export default class OrderDetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    order_number: number;

    @CreateDateColumn()
    @IsDate()
    emittedDate: Date;

    @OneToMany(() => Item, (item) => item.orderDetail)
    items: Item[];

    @Column()
    @IsNumber()
    total_price: number;

    @Column({ default: "pending" })
    @IsString()
    status: string;

    @ManyToOne(() => User, (user) => user.orderDetails)
    user: User;
}
