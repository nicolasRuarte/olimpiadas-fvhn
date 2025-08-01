import Item from "@entities/Item";
import { AppDataSource } from "@root/db";
import { readServiceByIdService } from "@services/service.services";
import { readOrderByIdService } from "@services/order.services";

const itemRepository = AppDataSource.getRepository(Item).extend({
    async createItem(serviceId: number, orderId: string, quantity: number): Promise<Item> {
        const newItem = this.create({ quantity: quantity });
        newItem.service = await readServiceByIdService(serviceId);
        newItem.order = await readOrderByIdService(orderId);

        await this.save(newItem);

        return newItem;
    },

    async createSameItemAgain(data: Partial<Item>): Promise<Item> {
        const newItem = this.create();
        newItem.service = await readServiceByIdService(data.serviceId as number);
        newItem.order = await readOrderByIdService(data.orderId as string);
        newItem.quantity = data.quantity as number;

        console.log("NEW SAME ITEM", newItem)
        return await this.save(newItem);
    },

    async readAllItems(): Promise<Item[]> {
        return await this.find({ relations: { order: true, service: true, orderDetail: true }});
    }
})

export default itemRepository;
