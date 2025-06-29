import { Column, Entity, BaseEntity, PrimaryColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";

@Entity()
export class Order extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @ManyToMany(() => Service, (service) => service.orders)
    @JoinTable()
    items: Service[];

    @Column({ default: 0.0 })
    total_price: number;
}
