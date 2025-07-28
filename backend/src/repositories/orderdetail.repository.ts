import { AppDataSource } from "@root/db";
import OrderDetail from "@entities/OrderDetail";

const orderDetailRepository = AppDataSource.getRepository(OrderDetail).extend({
    async createOrderDetail(data: Partial<OrderDetail>): Promise<OrderDetail> {
        const newService = this.create(data);

        return this.save(newService);
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
