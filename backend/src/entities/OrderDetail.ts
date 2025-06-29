import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class OrderDetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    order_number: number;

    @CreateDateColumn()
    emittedDate: Date;
     
    @Column()
    total_price: number;

    @ManyToOne(() => User, (user) => user.orderDetails)
    user: User;

}
