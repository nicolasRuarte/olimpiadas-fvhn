import { AppDataSource } from "@root/db";
import OrderDetail from "@entities/OrderDetail";
import orderRepository from "./order.repository";
import Item from "@entities/Item";
import itemRepository from "./item.repository";

function calculateTotalPrice(items: Item[]): number {
    let total = 0;
    for (const item of items) {
        total += item.service.price * item.quantity;
    }

    return total;
}

const orderDetailRepository = AppDataSource.getRepository(OrderDetail).extend({
    async createOrderDetail(orderId: number): Promise<OrderDetail> {
        const order = await orderRepository.readOrderById(orderId);
        if (!order) throw new Error("not-found");

        const newOrderDetail = this.create();
        newOrderDetail.items = order.items;
        for (const item of newOrderDetail.items) {
            item.orderDetail = newOrderDetail;
        }
        await itemRepository.save(newOrderDetail.items);

        newOrderDetail.total_price = calculateTotalPrice(order.items);

        order.items = [];
        orderRepository.save(order);

        return await this.save(newOrderDetail);
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
