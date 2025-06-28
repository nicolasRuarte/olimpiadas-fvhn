import { Column, Entity, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.ts";

@Entity()
export class Order extends BaseEntity {
    @PrimaryColumn()
    @OneToOne(() => User, (user) => user.order)
    dni: string;

    @Column()
    total_price: number;
}
