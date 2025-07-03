import { Column, 
    Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";
import {
    IsDate,
    IsNumber
} from "class-validator";

@Entity()
export class OrderDetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    order_number: number;

    @CreateDateColumn()
    @IsDate()
    emittedDate: Date;
     
    @ManyToOne(() => User, (user) => user.orderDetails)
    user: User;

    @ManyToMany(() => Service)
    @JoinTable()
    items: Service[];

    @Column()
    @IsNumber()
    total_price: number;

    @Column({ default: "pending" })
    status: string;
}
