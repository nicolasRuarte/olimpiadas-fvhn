
export async function logInUser(req: Request, res: Response) {
    const { dni, email, password } = req.body;

    try {
        const userToLogIn = await userRepository.findOne({ where: [ { dni: dni }, { email: email } ] });
        if (userToLogIn === null) throw new Error("not-found");

        const isPasswordCorrect = await bcrypt.compare(password, userToLogIn?.password);
        if (!isPasswordCorrect) throw new Error("La contraseña o el usuario son incorrectos");

        const role: string = userToLogIn.role;
        const token = jwt.sign(
            { dni, role },
            JWT_SECRET,
            {
                expiresIn: "24h"
            });

        const twentyFourHoursInSeconds = 1000 * 60 * 60 * 24;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: twentyFourHoursInSeconds
        }).status(200)
        .send({ dni, role, token });

        console.log("Loggeando usuario");
        res.status(200).send({ message: "Usuario loggeado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(400).send(createErrorMessage(error as string));
    }
}

export async function getAllPurchases(req: Request, res: Response) {
    try {
        const token = req.cookies.access_token;
        if (token === undefined || token === null) throw new Error("access-denied");

        const data = jwt.verify(token, JWT_SECRET);


        // Si se puede eliminar los any
        const user = await userRepository.findOne({ where: { dni: (<any>data).dni }, relations: { orderDetails: true } });
        if (user === null) throw new Error("not-found");

        res.status(200).send(user.orderDetails);
        console.log("Devolviendo todas las compras del usuario");
    } catch (error) {
        console.error(error);
        res.send(createErrorMessage(error as string));
    }
}
