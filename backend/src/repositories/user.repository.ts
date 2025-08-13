import { AppDataSource } from "@root/db";
import User from "@entities/User";
import Rating from "@entities/Rating";
import { DeleteResult, UpdateResult } from "typeorm";
import orderRepository from "./order.repository";
import OrderDetail from "@entities/OrderDetail";

const userRepository = AppDataSource.getRepository(User).extend({
    async createUser(data: Partial<User>): Promise<Partial<User>> {
        const existing = await this.findOneBy({ dni: data.dni });
        if (existing) throw new Error("Usuario ya existe");

        const newUser = this.create(data);
        await this.save(newUser);

        const newOrder = orderRepository.create({ user: newUser });
        await orderRepository.save(newOrder);

        newUser.orders = [];
        newUser.orders.push(newOrder);

        const { password:_, ...userWithoutPassword } = await this.save(newUser);

        return userWithoutPassword;
    },

    async readUserByDni(dni: string): Promise<Partial<User>> {
        const user = await this.findOne({ select: { dni: true, surname: true, names: true, email: true, phone_number: true }, where: { dni: dni} });
        if (!user) throw new Error("not-found");

        return user;
    },

    async findAllUsers(): Promise<User[]> {
        const users = await this.find({ select: { dni: true, surname: true, names: true, email: true, phone_number: true } });

        return users;
    },

    async updateUser(dni: string, updatedData: Partial<User>): Promise<UpdateResult> {
        return await this.update({ dni: dni }, updatedData);
    },

    async deleteUser(dni: string): Promise<DeleteResult> {
        return await this.delete({ dni: dni });
    },

    async addRatingToUser(rating: Rating): Promise<void> {
        const user = await this.findOneBy({ dni: rating.user?.dni as string}) as User;

        if (!user.ratings) {
            user.ratings = [];
            user.ratings.push(rating);
        } else {
            user.ratings.push(rating);
        }

        await this.save(user);
    },

    async asignNewOrder(userDni: string): Promise<void> {
        const user = await this.readUserByDni(userDni) as User;
        if (!user) throw new Error("not-found");

        const order = await orderRepository.createOrder(user);
        
        if (!user.orders) user.orders = [];
        user.orders.push(order);

        await this.save(user);
    },

    async addOrderDetail(userDni: string, orderDetail: OrderDetail): Promise<void> {
        const user = await this.readUserByDni(userDni);
        if(!user) throw new Error("not-found");

        if (!user.orderDetails) user.orderDetails = [];
        user.orderDetails.push(orderDetail);

        await this.save(user);
    }
});

export default userRepository;
