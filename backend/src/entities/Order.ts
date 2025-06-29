import { Column, Entity, BaseEntity, PrimaryColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Order extends BaseEntity {
    @PrimaryColumn()
    @OneToOne(() => User, (user) => user.order)
    dni: string;

    @Column()
    total_price: number;
}
