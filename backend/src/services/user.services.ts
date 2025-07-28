import User from "@entities/User";
import UserRepository from "@repositories/user.repository";
import bcrypt from "bcrypt";
import { DeleteResult, UpdateResult } from "typeorm";

export const createUserService = async (data: Partial<User>): Promise<User> => {
    if (!data.password) throw new Error("PASSWORD_REQUIRED");

    const hashedPassword = await bcrypt.hash(data.password, 10)
    return await UserRepository.createUser({ ...data, password: hashedPassword })
}

export const getAllUsersService = async (): Promise<User[]> => {
    return await UserRepository.findAllUsers()
}

export const getUserByDniService = async (dni: string): Promise<User> => {
    return await UserRepository.findByDni(dni)
}

export const updateUserService = async (dni: string, data: Partial<User>): Promise<UpdateResult> => {
    return await UserRepository.updateUser(dni, data)
}

export const deleteUserService = async (dni: string): Promise<DeleteResult> => {
    return await UserRepository.deleteUser(dni);
}
