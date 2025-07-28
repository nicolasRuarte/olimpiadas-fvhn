import { AppDataSource } from "@root/db";
import Order from "@entities/Order";
import { UpdateResult, DeleteResult } from "typeorm";

const orderRepository = AppDataSource.getRepository(Order).extend({
    async createOrder(data: Partial<Order>): Promise<Order> {
        const newOrder = this.create(data);

        return this.save(newOrder);
    },

    async readOrderById(id: string): Promise<Order | null> {
        const order = await this.findOneBy({ id: id });

        return order;
    },

    async readAllOrders(): Promise<Order[] | undefined> {
        const orders = await this.find();

        return orders;
    },

    async updateOrder(data: Partial<Order>): Promise<UpdateResult> {
        return await this.update({ id: data.id }, data);

    },

    async deleteOrder(id: string): Promise<DeleteResult> {
        return await this.delete({ id: id });
    },
});

export default orderRepository;
