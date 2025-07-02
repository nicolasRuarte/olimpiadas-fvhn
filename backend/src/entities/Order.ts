import {  Entity, BaseEntity, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Service } from "./Service";
import {
    IsString
} from "class-validator";

@Entity()
export class Order extends BaseEntity {
    @PrimaryColumn()
    @IsString()
    id: string;

    @ManyToMany(() => Service)
    @JoinTable()
    items: Service[];
}
