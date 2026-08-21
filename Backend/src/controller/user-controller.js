import { prisma } from "../db.js";
export const login = async (request, response) => {
    const user = request.body;
    const findUser = await prisma.user.findUnique({
        where: { email: user.email, password: user.password },
    });
    if (findUser === null) {
        response.json({ message: "Email ou senha inválidos" });
        return;
    }
    console.log(findUser);
    response.json(findUser);
};
export const register = async (request, response) => {
    const user = request.body;
    const findUser = await prisma.user.findUnique({
        where: { email: user.email },
    });
    if (findUser !== null) {
        response.status(400).json({ message: "Email já cadastrado" });
        return;
    }
    await prisma.user.create({
        data: { name: user.name, email: user.email, password: user.password },
    });
    response.json({
        message: "Cadastro realizado com sucesso!",
    });
};
//# sourceMappingURL=user-controller.js.map