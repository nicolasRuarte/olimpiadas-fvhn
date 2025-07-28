import { AppDataSource } from "@root/db";
import User from "@entities/User";
import { DeleteResult, UpdateResult } from "typeorm";

const userRepository = AppDataSource.getRepository(User).extend({
    async createUser(data: Partial<User>): Promise<User> {
        const existing = this.findOneBy({ dni: data.dni });
        if (existing !== null) throw new Error("Usuario ya existe");

        const user = this.create(data);

        return await this.save(user);
    },

    async findByDni(dni: string): Promise<User> {
        const user = await this.findOneBy({ dni: dni });
        if (user === null) throw new Error("not-found");

        return user;
    },

    async findAllUsers(): Promise<User[]> {
        const users = await this.find();

        return users;
    },

    async updateUser(dni: string, updatedData: Partial<User>): Promise<UpdateResult> {
        return await this.update({ dni: updatedData.dni }, updatedData);
    },

    async deleteUser(dni: string): Promise<DeleteResult> {
        return this.delete({ dni: dni });
    }
});

export default userRepository;
