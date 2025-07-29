import User from "@entities/User";
import UserRepository from "@repositories/user.repository";
import bcrypt from "bcrypt";
import { DeleteResult, UpdateResult } from "typeorm";
import { validateStringId } from "@functionality/validation";

export const createUserService = async (data: Partial<User>): Promise<User> => {
    if (!data.password) throw new Error("Contraseña es obligatoria para crear el usuario");

    const hashedPassword = await bcrypt.hash(data.password, 10)

    return await UserRepository.createUser({ ...data, password: hashedPassword })
}

export const getAllUsersService = async (): Promise<User[]> => {
    return await UserRepository.findAllUsers()
}

export const getUserByDniService = async (dni: string): Promise<User> => {
    if (!validateStringId(dni)) throw new Error("invalid-id");

    return await UserRepository.findByDni(dni)
}

export const updateUserService = async (dni: string, data: Partial<User>): Promise<UpdateResult> => {
    if (!validateStringId(dni)) throw new Error("invalid-id");

    return await UserRepository.updateUser(dni, data)
}

export const deleteUserService = async (dni: string): Promise<DeleteResult> => {
    if (!validateStringId(dni)) throw new Error("invalid-id");

    return await UserRepository.deleteUser(dni);
}
