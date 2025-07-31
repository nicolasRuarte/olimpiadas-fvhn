import Item from "@entities/Item";
import { AppDataSource } from "@root/db";
import { readServiceByIdService } from "@services/service.services";
import { readOrderByIdService } from "@services/order.services";

const itemRepository = AppDataSource.getRepository(Item).extend({
    async createItem(serviceId: number, orderId: string, quantity: number): Promise<Item> {
        const newItem = this.create();
        newItem.service = await readServiceByIdService(serviceId);
        newItem.order = await readOrderByIdService(orderId);
        newItem.quantity = quantity;

        await this.save(newItem);

        return newItem;
    }
})

export default itemRepository;
