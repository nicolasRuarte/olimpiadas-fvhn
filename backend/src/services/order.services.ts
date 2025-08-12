import Order from "@entities/Order";
import OrderRepository from "@repositories/order.repository";
import { DeleteResult, UpdateResult } from "typeorm";
import { validateNumberId, validateStringId } from "@functionality/validation";
import orderRepository from "@repositories/order.repository";

export const createOrderService = async (id: number) => {
    return await OrderRepository.createOrder(id);
}

export const readAllOrdersService = async (): Promise<Order[] | undefined> => {
    return await OrderRepository.readAllOrders();
}

export const readOrderByIdService = async (id: number): Promise<Order> => {
    if (!validateNumberId(id)) throw new Error("invalid-id");

    const order = await OrderRepository.readOrderById(id)
    if (order === null) throw new Error("not-found");

    return order;
}

export async function readOrderByUserDniService(dni: string): Promise<Order[]> {
    if (!validateStringId(dni)) throw new Error("invalid-id");

    return await orderRepository.readOrderByUserDni(dni);
}

export async function addOneItemService(serviceId: number, orderId: number, quantity: number): Promise<Order> {
    if (!validateNumberId(serviceId) || !validateNumberId(orderId)) throw new Error("invalid-id");

    return await OrderRepository.addOneItem(serviceId, orderId, quantity);
}

export const updateOrderService = async (id: number, data: Partial<Order>): Promise<void> => {
    if (!validateNumberId(id)) throw new Error("invalid-id");

    await OrderRepository.updateOrder(data)
}

export const deleteOrderService = async (id: number): Promise<void> => {
    if (!validateNumberId(id)) throw new Error("invalid-id");

    await OrderRepository.deleteOrder(id);
}

export async function removeOneItemService(serviceId: number, orderId: number, quantity: number): Promise<Order> {
    if (!validateNumberId(orderId)) throw new Error("invalid-id");
    if (!validateNumberId(serviceId)) throw new Error("invalid-id");

    return await OrderRepository.removeOneItem(serviceId, orderId, quantity);
}


export async function removeAllItems(id: number): Promise<void> {
    if (!validateNumberId(id)) throw new Error("invalid-id");

    await OrderRepository.removeAllItems(id);
}
