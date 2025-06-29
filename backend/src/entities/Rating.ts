import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";

@Entity()
export class Rating extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user: User) => user.ratings)
    user: User;

    @ManyToOne(() => Service, (service: Service) => service.ratings)
    service: Service;
}
