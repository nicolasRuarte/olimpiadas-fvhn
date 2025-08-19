import OrderDetail from "@entities/OrderDetail";
import OrderDetailRepository from "@repositories/orderdetail.repository";
import { validateNumberId, validateStringId } from "@functionality/validation";

export const createOrderDetailService = async (orderId: number, userDni: string): Promise<OrderDetail> => {
    if (!validateNumberId(orderId)) throw new Error("invalid-number-id");
    if (!validateStringId(userDni)) throw new Error("invalid-string-id");

    return await OrderDetailRepository.createOrderDetail(orderId, userDni);
}

export const readAllOrderDetailsService = async (): Promise<OrderDetail[]> => {
    return await OrderDetailRepository.readAllOrderDetails()
}

export const readOrderDetailByOrderNumberService = async (orderNumber: number): Promise<OrderDetail> => {
    if (!validateNumberId(orderNumber)) throw new Error("invalid-number-id");

    return await OrderDetailRepository.readOrderDetailByOrderNumber(orderNumber)
}

export async function updateOrderDetailStatusService(orderNumber: number, newStatus: string): Promise<OrderDetail> {
    if (!validateNumberId(orderNumber)) throw new Error("invalid-number-id");

    return await OrderDetailRepository.updateStatus(orderNumber, newStatus);
}
