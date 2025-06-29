import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm";
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

    @ManyToMany(() => Service, (service) => service.orderDetails)
    items: Service[];

    @Column({ default: 0.0 })
    total_price: number;
}
