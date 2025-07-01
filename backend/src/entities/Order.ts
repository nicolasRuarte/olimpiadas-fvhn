import {  Entity, BaseEntity, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Service } from "./Service";

@Entity()
export class Order extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @ManyToMany(() => Service)
    @JoinTable()
    items: Service[];
}
