import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@entities/User";
import userRepository from "@repositories/user.repository";
import { JWT_SECRET } from "@root/config";

export async function logInService(dni: string, password: string): Promise<{ token: string, user: Partial<User>}> {
    const user = await userRepository.findOneBy({ dni: dni }) as unknown as User; // Solo hago esta línea porque la validación del condicional de abajo no parece hacer callar al compilador
    if (!user) throw new Error("not-found");

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) throw new Error("La contraseña ingresada no es correcta");

    const token = jwt.sign(
        { dni: user.dni, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "24h" }
    )

    const { password: _, ...userWithoutPassword } = user;

    return { token: token, user: userWithoutPassword };
}
