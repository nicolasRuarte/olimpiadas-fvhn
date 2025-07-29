import { AppDataSource } from "@root/db";
import OrderDetail from "@entities/OrderDetail";
import {
    removeAllItems
} from "@services/order.services";

const orderDetailRepository = AppDataSource.getRepository(OrderDetail).extend({
    async createOrderDetail(orderId: string, data: Partial<OrderDetail>): Promise<OrderDetail> {
        await removeAllItems(orderId);

        const newOrderDetail = this.create(data);

        return this.save(newOrderDetail);
    },

    async readOrderDetailByOrderNumber(orderNumber: number): Promise<OrderDetail> {
        const orderDetail = await this.findOneBy({order_number: orderNumber});
        if (orderDetail === null) throw new Error("not-found");

        return orderDetail;
    },

    async readAllOrderDetails(): Promise<OrderDetail[]> {
        const orderDetails = await this.find();
        if (orderDetails === undefined) throw new Error("No hay ningún servicio registrado");

        return orderDetails;
    },
});

export default orderDetailRepository;
