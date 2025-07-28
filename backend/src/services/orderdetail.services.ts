import OrderDetail from "@entities/OrderDetail";
import OrderDetailRepository from "@repositories/orderdetail.repository";
import { validateNumberId } from "@functionality/validation";

export const createOrderDetailService = async (data: Partial<OrderDetail>): Promise<OrderDetail> => {
    return await OrderDetailRepository.createOrderDetail(data);
}

export const readAllOrderDetailsService = async (): Promise<OrderDetail[]> => {
    return await OrderDetailRepository.readAllOrderDetails()
}

export const readOrderDetailByOrderNumberService = async (orderNumber: number): Promise<OrderDetail> => {
    if (!validateNumberId(orderNumber)) throw new Error("invalid-id");

    return await OrderDetailRepository.readOrderDetailByOrderNumber(orderNumber)
}
