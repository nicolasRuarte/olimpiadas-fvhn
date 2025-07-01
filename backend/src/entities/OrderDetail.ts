import { Column, 
    Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";

@Entity()
export class OrderDetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    order_number: number;

    @CreateDateColumn()
    emittedDate: Date;
     
    @ManyToOne(() => User, (user) => user.orderDetails)
    user: User;

    @ManyToMany(() => Service)
    @JoinTable()
    items: Service[];

    @Column()
    total_price: number;
}
