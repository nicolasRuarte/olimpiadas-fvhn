import Item from "@entities/Item";
import { AppDataSource } from "@root/db";
import serviceRepository from "./service.repository";
import orderRepository from "./order.repository";
import { Equal } from "typeorm";

const itemRepository = AppDataSource.getRepository(Item).extend({
    async readByIds(serviceId: number, orderId: number): Promise<Item | null> {
        console.log("SERVICE ID: ", serviceId)
        console.log("ORDER ID: ", orderId);
        //const item = await this.find({ where: { service: { id: Equal(serviceId) }, order: { id: Equal(orderId) } }});
        const item = await this
        .createQueryBuilder("item")
        .leftJoinAndSelect("item.service", "service")
        .leftJoinAndSelect("item.order", "order")
        .where("service.id = :serviceId", { serviceId: serviceId })
        .andWhere("order.id = :orderId", { orderId: orderId })
        .getOne()

        return item;
    },

    async deleteById(serviceId: number, orderId: number): Promise<void> {
        this
        .createQueryBuilder("item")
        .leftJoinAndSelect("item.service", "service")
        .leftJoinAndSelect("item.order", "order")
        .leftJoinAndSelect("item.orderDetail", "orderDetail")
        .where("service.id = :serviceId", { serviceId: serviceId })
        .andWhere("order.id = :orderId", { orderId: orderId })
        .andWhere("orderDetail.order_number = :orderDetailOrderNumber", { orderDetailOrderNumber: null })
        .delete();
    },

    async checkIfItemExists(serviceId: number, orderId: number): Promise<boolean> {
        const result = await this.readByIds(serviceId, orderId);

        return result ? true : false; 
    },

    async createItem(serviceId: number, orderId: number, quantity: number): Promise<Item> {
        const itemAlreadyExists = await this.checkIfItemExists(serviceId, orderId);
        if (itemAlreadyExists) throw new Error("already-exists");

        const newItem = this.create({ quantity: quantity });
        const service = await serviceRepository.findOneBy({ id: serviceId });
        const order =  await orderRepository.findOneBy({ id: orderId });;

        if (!service) throw new Error("not-found");
        if(!order) throw new Error("not-found");

        newItem.service = service;
        newItem.order = order;

        await serviceRepository.addItemRelation(newItem, serviceId);

        return await this.save(newItem);
    },

    async addToQuantity(serviceId: number, orderId: number, quantity: number): Promise<void> {
        const item = await this.readByIds(serviceId, orderId);
        if (!item) throw new Error("not-found");

        item.quantity += quantity;

        await this.save(item);
    },

    async substractToQuantity(serviceId: number, orderId: number, quantity: number): Promise<void> {
        const item = await this.readByIds(serviceId, orderId);
        if(!item) throw new Error("not-found");

        if (item.quantity === 1) {
            await this.deleteById(serviceId, orderId);
        }

        item.quantity -= quantity;

        await this.save(item);
    },

    async readAllItems(): Promise<Item[]> {
        return await this.find({ relations: { order: true, service: true, orderDetail: true }});
    },

    async deleteOne(serviceId: number, orderId: number): Promise<void> {
        const item = await this.readByIds(serviceId, orderId);
        if (!item) throw new Error("not-found");

        await this.delete({ service: { id: serviceId }, order: { id: orderId } });
    }

})

export default itemRepository;
