import Item from "@entities/Item";
import { AppDataSource } from "@root/db";
import serviceRepository from "./service.repository";
import orderRepository from "./order.repository";
import orderDetailRepository from "./orderdetail.repository";

const itemRepository = AppDataSource.getRepository(Item).extend({
    async readByIds(serviceId: number , orderId: number ): Promise<Item | null> {
            
        const item = await this.
        createQueryBuilder("item")
        .leftJoinAndSelect("item.order", "order")
        .leftJoinAndSelect("item.service", "service")
        .where("service.id = :serviceId", { serviceId })
        .andWhere("order.id = :orderId", { orderId })
        .getOne()

        return item;
    },

    async readByOrderNumber(orderNumber: number): Promise<Item[]> {
        const items = await this
        .createQueryBuilder("item")
        .leftJoinAndSelect("item.order", "order")
        .leftJoinAndSelect("item.service", "service")
        .leftJoinAndSelect("item.orderDetail", "orderDetail")
        .where("orderDetail.order_number = :orderNumber", { orderNumber })
        .getMany();

        return items;
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
        if (quantity < 0) throw new Error("No se pueden enviar números negativos en quantity");

        const item = await this.readByIds(serviceId, orderId);
        if (!item) throw new Error("not-found");

        item.quantity += quantity;

        await this.save(item);
    },

    async substractToQuantity(serviceId: number, orderId: number, quantity: number): Promise<void> {
        if (quantity < 0) throw new Error("No se pueden enviar números negativos en quantity");

        const item = await this.readByIds(serviceId, orderId);
        if(!item) throw new Error("not-found");

        if (item.quantity === 1) {
            await this.deleteById(serviceId, orderId);
        }

        item.quantity -= quantity;

        await this.save(item);
    },

    async readAllItems(): Promise<Item[]> {
        return await this
        .createQueryBuilder("item")
        .leftJoinAndSelect("item.service", "service")
        .leftJoinAndSelect("item.order", "order")
        .getMany()
    },

    async readAllFromOrderId(orderId: number): Promise<Item[]> {
        return await this
        .createQueryBuilder("item")
        .leftJoinAndSelect("item.order", "order")
        .where("order.id = :orderId", { orderId })
        .getMany();
    },

    async getServiceAndOrder(item: Item): Promise<Item> {
        const selectedItem = await this.findOne({ relations: { service: true, order: true }, where: { service: item.service, order: item.order }})
        if (!selectedItem) throw new Error("not-found");

        return selectedItem;
    },

    async deleteOne(serviceId: number, orderId: number): Promise<void> {
        const item = await this.readByIds(serviceId, orderId);
        if (!item) throw new Error("not-found");

        await this.delete({ service: { id: serviceId }, order: { id: orderId } });
    },

    async assignOrderDetailRelation(orderNumber: number, orderId: number): Promise<void> {
        const items = await this
        .createQueryBuilder("item")
        .leftJoinAndSelect("item.order", "order")
        .where("order.id = :orderId", { orderId })
        .getMany()

        for (const item of items) {
            item.orderDetail = await orderDetailRepository.readOrderDetailByOrderNumber(orderNumber);
        }

        await this.save(items);
    }

})

export default itemRepository;
