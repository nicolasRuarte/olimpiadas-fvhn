import {  Entity, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";
import {
    IsString
} from "class-validator";
import Item from "./Item";

@Entity()
export default class Order extends BaseEntity {
    @PrimaryColumn()
    @IsString()
    id: string;

    @OneToMany(() => Item, (item) => item.order)
    items: Item[];
}
