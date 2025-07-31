import Order from "@entities/Order";
import Item from "@entities/Item";
import OrderRepository from "@repositories/order.repository";
import { DeleteResult, UpdateResult } from "typeorm";
import { validateStringId } from "@functionality/validation";

export const createOrderService = async (id: string) => {
    return await OrderRepository.createOrder(id);
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

export async function addOneItemService(id: string, item: { serviceId: number, orderId: string, quantity: number }): Promise<Order> {
    if (!validateStringId(id)) throw new Error("invalid-id");

    return await OrderRepository.addOneItem(id, item);
}

export const updateOrderService = async (id: string, data: Partial<Order>): Promise<UpdateResult> => {
    if (!validateStringId(id)) throw new Error("invalid-id");

    return await OrderRepository.updateOrder(data)
}

export const deleteOrderService = async (id: string): Promise<DeleteResult> => {
    if (!validateStringId(id)) throw new Error("invalid-id");

    return await OrderRepository.deleteOrder(id);
}

export async function removeAllItems(id: string): Promise<UpdateResult> {
    if (!validateStringId(id)) throw new Error("invalid-id");

    return await OrderRepository.removeAllItems(id);
}
