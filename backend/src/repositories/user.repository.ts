import { AppDataSource } from "@root/db";
import User from "@entities/User";
import { DeleteResult, UpdateResult } from "typeorm";

const userRepository = AppDataSource.getRepository(User).extend({
    async createUser(data: Partial<User>): Promise<User> {
        const existing = this.findOneBy({ dni: data.dni });
        if (!existing) throw new Error("Usuario ya existe");

        const newUser = this.create(data);
        this.save(newUser);

        return newUser;
    },

    async findByDni(dni: string): Promise<User> {
        const user = await this.findOneBy({ dni: dni });
        console.log(user)
        if (!user) throw new Error("not-found");

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
