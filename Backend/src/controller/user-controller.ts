//Express Type
import type { Request, Response } from "express";

//Prisma
import { prisma } from "../db.js";

export const login = async (request: Request, response: Response) => {
  try {
    const user = request.body;

    const findUser = await prisma.user.findUnique({
      where: { email: user.email, password: user.password },
    });

    if (findUser === null) {
      response.status(401).json({ message: "Email ou senha inválidos" });
      return;
    }

    console.log(findUser);
    response.status(200).json(findUser);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Erro interno do Servidor" });
  }
};

export const register = async (request: Request, response: Response) => {
  try {
    const user = request.body;

    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (findUser !== null) {
      response.status(409).json({ message: "Email já cadastrado" });
      return;
    }

    await prisma.user.create({
      data: { name: user.name, email: user.email, password: user.password },
    });

    response.status(201).json({
      message: "Cadastro realizado com sucesso!",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Erro interno do servidor" });
  }
};
