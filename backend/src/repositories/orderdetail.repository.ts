import { AppDataSource } from "@root/db";
import OrderDetail from "@entities/OrderDetail";
import OrderRepository from "@repositories/order.repository";
import Item from "@entities/Item";
import itemRepository from "./item.repository";
import userRepository from "./user.repository";
import { sendPurchaseConfirmationEmail } from "@services/nodemailer.services";

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
        const order = await OrderRepository.readOrderItemsById(orderId);
        if (!order) throw new Error("not-found");

        const newOrderDetail = this.create();

        newOrderDetail.items = order.items;
        newOrderDetail.total_price = await calculateTotalPrice(order.items);
        newOrderDetail.user = order.user;

        const result = await this.save(newOrderDetail);

        await OrderRepository.markAsBought(order.id);

        // Bidireccionalidad y funciones extras para que las entidades Item y Usuario funcionen bien
        await itemRepository.assignOrderDetailRelation(result.order_number, orderId);

        await userRepository.asignNewOrder(userDni);

        await userRepository.addOrderDetail(userDni, newOrderDetail);

        const user = await userRepository.readUserByDni(userDni);
        if (!user) throw new Error("not-found");

        sendPurchaseConfirmationEmail(user.email as string);

        return result;
    },

    async readOrderDetailByOrderNumber(orderNumber: number): Promise<OrderDetail> {
        const orderDetail = await this.findOneBy({order_number: orderNumber});
        if (!orderDetail) throw new Error("not-found");

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
    },
});

export default orderDetailRepository;
