import { AppDataSource } from "@root/db";
import Order from "@entities/Order";
import Item from "@entities/Item";
import { UpdateResult, DeleteResult } from "typeorm";
import itemRepository from "@repositories/item.repository";

const orderRepository = AppDataSource.getRepository(Order).extend({
    async createOrder(id: string): Promise<Order> {
        const newOrder = this.create();
        newOrder.id = id;

        return await this.save(newOrder);
    },

    async readOrderById(id: string): Promise<Order | null> {
        const order = await this.findOneBy({ id: id });

        return order;
    },

    async readAllOrders(): Promise<Order[] | undefined> {
        const orders = await this.find({ relations: { items: true }});

        return orders;
    },

    async updateOrder(data: Partial<Order>): Promise<UpdateResult> {
        return await this.update({ id: data.id }, data);
    },

    async deleteOrder(id: string): Promise<DeleteResult> {
        return await this.delete({ id: id });
    },

    async addOneItem(id: string, item: { serviceId: number, orderId: string, quantity: number }): Promise<Order> {
        const newItem = await itemRepository.createItem(item.serviceId, item.orderId, item.quantity);

        const order = await this.findOneBy({ id: id });
        if (!order) throw new Error("not-found");

        if (order.items === undefined) {
            order.items = [];
            order.items.push(newItem);
        } else {
            order.items.push(newItem);
        }

        await this.save(order);

        return order;
    },

    async addItems(id: string, items: Item[]): Promise<{}>{
        return {};
    },

    async removeOneItem(id: string, itemIds: { orderId: string, serviceId: number }): Promise<Order> {
        return new Order;
    },

    async removeAllItems(id: string): Promise<UpdateResult> {
        return await this.update({ id: id }, { items: [] });
    }
});

export default orderRepository;
