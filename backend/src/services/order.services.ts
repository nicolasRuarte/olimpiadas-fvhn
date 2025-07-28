import Order from "@entities/Order";
import Item from "@entities/Item";
import OrderRepository from "@repositories/order.repository";
import { DeleteResult, UpdateResult } from "typeorm";
import { validateStringId } from "@functionality/validation";

export const createOrderService = async (data: Partial<Order>) => {
    return await OrderRepository.createOrder(data);
}

export const readAllOrdersService = async (): Promise<Order[] | undefined> => {
    return await OrderRepository.readAllOrders();
}

export const readOrderByIdService = async (id: string): Promise<Order> => {
    if (!validateStringId(id)) throw new Error("invalid-id");

    const order = await OrderRepository.readOrderById(id)
    if (order === null) throw new Error("not-found");

    return order;
}

export function addItemsService(id: string, item: Item[]): Promise<UpdateResult> {
    if (!validateStringId(id)) throw new Error("invalid-id");

    return OrderRepository.addItems(id, item)
}

export const updateOrderService = async (id: string, data: Partial<Order>): Promise<UpdateResult> => {
    if (!validateStringId(id)) throw new Error("invalid-id");

    return await OrderRepository.updateOrder(data)
}

export const deleteOrderService = async (id: string): Promise<DeleteResult> => {
    if (!validateStringId(id)) throw new Error("invalid-id");

    return await OrderRepository.deleteOrder(id);
}
