import User from "@entities/User";
import UserRepository from "@repositories/user.repository";
import bcrypt from "bcrypt";
import { DeleteResult, UpdateResult } from "typeorm";
import { validateRole, validateStringId, validateUserData } from "@functionality/validation";

export const createUserService = async (data: Partial<User>): Promise<Partial<User>> => {
    if (!validateStringId(data.dni)) throw new Error("invalid-string-id");
    if (!validateRole(data.role)) throw new Error;
    if (!validateUserData(data)) throw new Error("El esquema de datos enviado es incorrecto");

    const hashedPassword = await bcrypt.hash(data.password as string, 10)

    return await UserRepository.createUser({ ...data, password: hashedPassword })
}

export const getAllUsersService = async (): Promise<User[]> => {
    return await UserRepository.findAllUsers()
}

export const readUserByDniService = async (dni: string): Promise<Partial<User>> => {
    if (!validateStringId(dni)) throw new Error("invalid-id");

    return await UserRepository.readUserByDni(dni)
}

export const updateUserService = async (dni: string, data: Partial<User>): Promise<Partial<User>> => {
    if (!validateStringId(dni)) throw new Error("invalid-id");

    return await UserRepository.updateUser(dni, data)
}

export const deleteUserService = async (dni: string): Promise<{ message: string }> => {
    if (!validateStringId(dni)) throw new Error("invalid-id");

    return await UserRepository.deleteUser(dni);
}
