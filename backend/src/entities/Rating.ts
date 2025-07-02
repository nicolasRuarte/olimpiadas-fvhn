import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";
import {
    IsInt,
    Max,
    Min,
} from "class-validator";

@Entity()
export class Rating extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.ratings)
    user: User;

    @ManyToOne(() => Service, (service) => service.ratings)
    service: Service;

    @Column()
    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;
}
