import { Column, Entity, BaseEntity, PrimaryColumn, JoinColumn, OneToMany } from "typeorm";
import Order from "./Order";
import OrderDetail from "./OrderDetail";
import Rating from "./Rating";
import { 
    IsString,
    MinLength,
    IsEmail,
    Length
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

    @Column({ nullable: false })
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

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn()
    orders: Order[];

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.user)
    orderDetails: OrderDetail[];

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[]
}
