import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@entities/User";
import userRepository from "@repositories/user.repository";
import { JWT_SECRET } from "@root/config";
import { validateStringId } from "@functionality/validation";
import { readUserByDniService } from "./user.services";

export async function logInService(dni: string, password: string): Promise<{ token: string, user: Partial<User>}> {
    if (!validateStringId(dni)) throw new Error("invalid-string-id");

    const user = await readUserByDniService(dni);
    const userPassword = await userRepository.readPasswordByDni(dni);

    if (!user) throw new Error("not-found");
    if (!userPassword) throw new Error("La contraseña no fue encontrada");

    const passwordIsCorrect = await bcrypt.compare(password, userPassword);
    if (!passwordIsCorrect) throw new Error("La contraseña ingresada no es correcta");

    const token = jwt.sign(
        { dni: user.dni, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "48h" }
    )

    return { token: token, user: user };
}
