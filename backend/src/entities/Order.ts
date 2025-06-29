import { Column, Entity, BaseEntity, PrimaryColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";

@Entity()
export class Order extends BaseEntity {
    @PrimaryColumn()
    @OneToOne(() => User, (user) => user.order)
    id: string;

    @ManyToMany(() => Service, (service) => service.orders)
    @JoinTable()
    items: Service[];

    @Column()
    total_price: number;
}
