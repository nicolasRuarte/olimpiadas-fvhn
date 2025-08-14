import { AppDataSource } from "@root/db";
import Order from "@entities/Order";
import Item from "@entities/Item";
import User from "@entities/User";
import { UpdateResult, DeleteResult } from "typeorm";
import itemRepository from "@repositories/item.repository";


const orderRepository = AppDataSource.getRepository(Order).extend({
    async createOrder(user: User): Promise<Order> {
        const newOrder = this.create({ user: user });

        return await this.save(newOrder);
    },

    async readOrderById(id: number): Promise<Order | null> {
        const order = await this.findOne({ where: { id: id }, relations: { items: true }});
        if (!order) throw new Error("not-found");

        return order;
    },

    async readOrderByUserDni(dni: string): Promise<Order[]> {
        const order = await this
        .createQueryBuilder("order")
        .leftJoin("order.user", "user")
        .leftJoinAndSelect("order.items", "items")
        .where("user.dni = :dni", { dni: dni })
        .getMany()
        if (!order) throw new Error("not-found");

        return order;
    },

    async readAllOrders(): Promise<Order[] | undefined> {
        const orders = await this.find({ relations: { items: true, user: true } });

        return orders;
    },

    async updateOrder(data: Partial<Order>): Promise<UpdateResult> {
        return await this.update({ id: data.id }, data);
    },

    async deleteOrder(id: number): Promise<DeleteResult> {
        return await this.delete({ id: id });
    },

    async addOneItem(serviceId: number, orderId: number, quantity: number): Promise<Order> {
        const order = await this.findOne({ where: { id: orderId }, relations: { items: true } });
        if (!order) throw new Error("not-found");
        if (order.isBought) throw new Error("Esta orden ya fue comprada");

        const itemExists = await itemRepository.checkIfItemExists(serviceId, orderId);
        if (itemExists) {
            await itemRepository.addToQuantity(serviceId, orderId, quantity);
            return await this.findOne({ relations: { items: true }, where: { id: orderId } }) as Order;
        }

        const item = await itemRepository.createItem(serviceId, orderId, quantity);

        if(!order.items) order.items = [];
        
        order.items.push(item);

        return await this.save(order);
    },

    async removeOneItem(serviceId: number, orderId: number, quantity: number): Promise<Order> {
        const order = await this.findOne({ where: { id: orderId }, relations: { items: true } }) as unknown as Order;
        if (!order) throw new Error("not-found");

        const itemExists = await itemRepository.checkIfItemExists(serviceId, orderId);
        if (!itemExists) throw new Error("not-found");

        if (itemExists) {
            await itemRepository.substractToQuantity(serviceId, orderId, quantity)
            return await this.readOrderById(orderId) as Order;
        }

        throw new Error("Intentado borrar un item de una orden sin items");
    },

    async removeAllItems(id: number): Promise<UpdateResult> {
        return await this.update({ id: id }, { items: [] });
    },

    async markAsBought(id: number): Promise<void> {
        await this.update(id, { isBought: true });
    }
});

export default orderRepository;
