import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User";
import Service from "./Service";
import {
    IsInt,
    Max,
    Min,
} from "class-validator";

@Entity()
export default class Rating extends BaseEntity {
    @PrimaryColumn({name: "userId", type: "string" })
    @ManyToOne(() => User, (user) => user.ratings)
    @JoinColumn({ name: "userId" })
    user: User;

    @PrimaryColumn({ name: "serviceId", type: "number" })
    @ManyToOne(() => Service, (service) => service.ratings)
    @JoinColumn({ name: "serviceId" })
    service: Service;

    @Column()
    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;
}
