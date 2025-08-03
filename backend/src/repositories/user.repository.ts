import { AppDataSource } from "@root/db";
import User from "@entities/User";
import { DeleteResult, UpdateResult } from "typeorm";
import { createOrderService } from "@services/order.services";

const userRepository = AppDataSource.getRepository(User).extend({
    async createUser(data: Partial<User>): Promise<User> {
        const existing = await this.findOneBy({ dni: data.dni });
        if (existing) throw new Error("Usuario ya existe");

        const newOrder = await createOrderService(data.dni as string);

        const newUser = this.create(data);
        newUser.order = newOrder;
        await this.save(newUser);

        return newUser;
    },

    async readUserByDni(dni: string): Promise<Partial<User>> {
        const user = await this.findOneBy({ dni: dni });
        if (!user) throw new Error("not-found");

        return {
            dni: user.dni,
            surname: user.surname,
            names: user.names,
            email: user.email,
            phone_number: user.phone_number
        }
    },

    async findAllUsers(): Promise<User[]> {
        const users = await this.find();

        return users;
    },

    async updateUser(dni: string, updatedData: Partial<User>): Promise<UpdateResult> {
        return await this.update({ dni: dni }, updatedData);
    },

    async deleteUser(dni: string): Promise<DeleteResult> {
        return await this.delete({ dni: dni });
    }
});

export default userRepository;
