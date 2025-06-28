import { Column, BaseEntity, Entity, PrimaryColumn, OneToMany } from "typeorm";

@Entity()
export class Rating extends BaseEntity {
    @Column()
    rating: number;
}
