import { Column, Entity, BaseEntity, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import Order from "./Order";
import OrderDetail from "./OrderDetail";
import Rating from "./Rating";
import { IsInt,
    IsString,
    MinLength,
    IsEmail,
    Length,
} from "class-validator";

@Entity()
export default class User extends BaseEntity {
    @PrimaryColumn()
    @IsString()
    dni: string;

    @Column()
    @IsString()
    surname: string;

    @Column()
    @IsString()
    names: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @MinLength(8)
    password: string;

    @Column()
    @IsString()
    @Length(8)
    phone_number: string;

    @Column({ default: "client" })
    @IsString()
    role: string;

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.user)
    orderDetails: OrderDetail[];

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[]
}
