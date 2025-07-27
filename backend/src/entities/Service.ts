import { Column, BaseEntity, Entity, OneToMany, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Rating from "@entities/Rating";
import OrderDetail from "@entities/OrderDetail";
import {
    IsInt,
    IsString,
} from "class-validator";
import Item from "@entities/Item";


@Entity()
export default class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    description: string;

    @Column({ default: 0.0 })
    @IsInt()
    price: number;

    @OneToMany(() => Rating, (rating) => rating.service)
    ratings: Rating[];

    @OneToMany(() => Item, (items) => items.service)
    items: Item[];
}
