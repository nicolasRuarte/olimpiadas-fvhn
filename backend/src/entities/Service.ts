import { Column, BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Rating from "@entities/Rating";
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
