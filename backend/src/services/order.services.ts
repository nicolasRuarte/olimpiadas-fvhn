import Order from "@entities/Order";
import OrderRepository from "@repositories/order.repository";
import { DeleteResult, UpdateResult } from "typeorm";

export const createOrderService = async (data: Partial<Order>) => {
    return await OrderRepository.createOrder(data);
}

export const readAllOrdersService = async (): Promise<Order[]> => {
    return await OrderRepository.readAllOrders();
}

export const readOrderByIdService = async (dni: string): Promise<Order> => {
    const order = await OrderRepository.readOrderById(dni)
    if (order === null) throw new Error("not-found");

    return order;
}

export const updateOrderService = async (dni: string, data: Partial<Order>): Promise<UpdateResult> => {
    return await OrderRepository.updateOrder(data)
}

export const deleteOrderService = async (dni: string): Promise<DeleteResult> => {
    return await OrderRepository.deleteOrder(dni);
}
