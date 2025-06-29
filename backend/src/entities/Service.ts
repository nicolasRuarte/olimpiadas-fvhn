import { Column, BaseEntity, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Rating } from "./Rating";

@Entity()
export class Service extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @OneToMany(() => Rating, (rating) => rating.service)
    ratings: Rating[];
}
