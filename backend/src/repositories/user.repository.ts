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

        return this.readUserByDni(data.dni as string);
    },

    async readUserByDni(userDni: string): Promise<Partial<User>> {
        //const user = await this.findOne({ select: { dni: true, surname: true, names: true, email: true, phone_number: true }, where: { dni: dni} });
        //if (!user) throw new Error("not-found");
        const user = await this
        .createQueryBuilder("user")
        .where("user.dni = :userDni", { userDni })
        .getOne()

        if (!user) throw new Error("not-found");

        return user;
    },

    async readPasswordByDni(userDni: string): Promise<string> {
        const user = await this
        .createQueryBuilder("user")
        .select("user.password")
        .where("user.dni = :userDni", { userDni })
        .getOne()

        if (!user) throw new Error("not-found");

        return user.password;
    },

    async findAllUsers(): Promise<User[]> {
        const users = await this.find();
        if (!users || users.length === 0) throw new Error("not-found");

        return users;
    },

    async updateUser(dni: string, updatedData: Partial<User>): Promise<Partial<User>> {
        await this.update({ dni: dni }, updatedData);

        return await this.readUserByDni(dni);
    },

    async deleteUser(dni: string): Promise<{ message: string }> {
        await this.delete({ dni: dni });

        return { message: "El usuario fue borrado con éxito" };
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

    async addOrderDetailRelation(userDni: string, orderDetail: OrderDetail): Promise<void> {
        const user = await this.readUserByDni(userDni);
        if(!user) throw new Error("not-found");

        if (!user.orderDetails) user.orderDetails = [];
        user.orderDetails.push(orderDetail);

        await this.save(user);
    }
});

export default userRepository;
