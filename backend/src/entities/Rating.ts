import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";
import {
    IsInt,
    Max,
    Min,
} from "class-validator";

@Entity()
export class Rating extends BaseEntity {
    @PrimaryColumn()
    userDni: string

    @PrimaryColumn()
    serviceId: number

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
