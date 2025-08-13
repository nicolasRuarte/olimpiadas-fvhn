import { AppDataSource } from "@root/db";
import OrderDetail from "@entities/OrderDetail";
import orderRepository from "./order.repository";
import Item from "@entities/Item";
import itemRepository from "./item.repository";
import userRepository from "./user.repository";
import serviceRepository from "./service.repository";

async function calculateTotalPrice(items: Item[]): Promise<number> {
    let total = 0;
    for (const item of items) {
        const itemWithServiceAndOrder = await itemRepository.getServiceAndOrder(item);
        total += itemWithServiceAndOrder.service.price * item.quantity;
    }

    return total;
}

const orderDetailRepository = AppDataSource.getRepository(OrderDetail).extend({
    // Le pasamos el dni del usuario por conveniencia para realizar las direcciones bidireccionales entre User y Order y User y OrderDetail
    async createOrderDetail(orderId: number, userDni: string): Promise<OrderDetail> {
        const order = await orderRepository.readOrderById(orderId);
        if (!order) throw new Error("not-found");

        const newOrderDetail = this.create();
        newOrderDetail.items = order.items;
        for (const item of newOrderDetail.items) {
            item.orderDetail = newOrderDetail;
        }
        await itemRepository.save(newOrderDetail.items);

        newOrderDetail.total_price = await calculateTotalPrice(order.items);
        newOrderDetail.user = order.user;

        const result = await this.save(newOrderDetail);

        await orderRepository.markAsBought(order.id);

        await userRepository.asignNewOrder(userDni);

        // Asigna el order detail a user para cumplir la bidireccionalidad de las relaciones
        await userRepository.addOrderDetail(userDni, newOrderDetail);

        return result;
    },

    async readOrderDetailByOrderNumber(orderNumber: number): Promise<OrderDetail> {
        const orderDetail = await this.findOneBy({order_number: orderNumber});
        if (orderDetail === null) throw new Error("not-found");

        return orderDetail;
    },

    async readAllOrderDetails(): Promise<OrderDetail[]> {
        const orderDetails = await this.find({ relations: { items: true, user: true }, select: { user: { email: true, surname: true, names: true }, items: true } });
        if (orderDetails === undefined) throw new Error("No hay ningún servicio registrado");

        return orderDetails;
    },

    async updateStatus(orderNumber: number, newStatus: string): Promise<OrderDetail> {
        await this.update(orderNumber, { status: newStatus });

        return await this.readOrderDetailByOrderNumber(orderNumber);
    }
});

export default orderDetailRepository;
