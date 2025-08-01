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
        const order = await this.findOne({ where: { id: id }, relations: { items: true }});

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

    async addOneItem(id: string, itemToAdd: { serviceId: number, orderId: string, quantity: number }): Promise<Order> {
        const itemExists = itemRepository.findOne({ where: { orderId: itemToAdd.orderId, serviceId: itemToAdd.serviceId }})

        const order = await this.findOne({ where: { id: id }, relations: { items: true } });
        if (!order) throw new Error("not-found");

        let newItem;
        let itemIsInList = false;
        if (!itemExists) {
            newItem = await itemRepository.createItem(itemToAdd.serviceId, itemToAdd.orderId, itemToAdd.quantity);

        } else {
            for (let index = 0 ; index < order.items.length; index++) {
                if (order.items[index].orderId === id && order.items[index].serviceId === itemToAdd.serviceId) {
                    order.items[index].quantity++;
                    newItem = await itemRepository.save(order.items[index]);
                    itemIsInList = true;
                    break;
                }
            }
        }


        if (itemIsInList) {
            console.log("ORDER ITEMS DENTRO DE IF", order.items)
            await this.save(order);

            if (!order.items) {
                order.items = [];
                order.items.push(newItem as Item);
            } else {
                order.items.push(newItem as Item);
            }

            return order;
        }

        await this.save(order);

        return order;
    },

    async addItems(id: string, items: Item[]): Promise<{}>{
        return {};
    },

    async removeOneItem(id: string, itemIds: { orderId: string, serviceId: number }): Promise<Order> {
        const order = await this.findOne({ where: { id: id }, relations: { items: true } }) as unknown as Order;
        if (!order) throw new Error("not-found");

        const item = await itemRepository.findOne({ where: { orderId: itemIds.orderId, serviceId: itemIds.serviceId } });
        if (!item) throw new Error("not-found");

        if (item.quantity === 1){
            //order.items.filter((item) => item.orderId !== itemIds.orderId && item.serviceId !== itemIds.serviceId );
            itemRepository.delete({ orderId: itemIds.orderId, serviceId: itemIds.serviceId })
        } else {
            for (const item of order.items) {
                if (item.orderId === itemIds.orderId && item.serviceId === itemIds.serviceId) {
                    item.quantity++;
                    break;
                }
            }
        }
        this.save(order);

        return order;
    },

    async removeAllItems(id: string): Promise<UpdateResult> {
        return await this.update({ id: id }, { items: [] });
    }
});

export default orderRepository;
