//Express Type
import type { Request, Response } from "express";

//Prisma
import { prisma } from "../db.js";

//Hash and Token
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../auth.js";

export const login = async (request: Request, response: Response) => {
  try {
    const user = request.body;

    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (findUser === null) {
      response.status(401).json({ message: "Email não registrado" });
      return;
    }

    const passwordIsCorrect = await bcrypt.compare(
      user.password,
      findUser.password,
    );

    if (!passwordIsCorrect) {
      response.status(401).json({
        message: "Email ou senha incorreta",
      });
      return;
    }

    const token = createToken({
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
    });

    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24, //One day
    });

    response.status(201).json({
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Erro interno do Servidor" });
  }
};

export const register = async (request: Request, response: Response) => {
  try {
    const user = request.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (findUser !== null) {
      response.status(409).json({ message: "Email já cadastrado" });
      return;
    }

    await prisma.user.create({
      data: { name: user.name, email: user.email, password: hashedPassword },
    });

    response.status(201).json({
      message: "Cadastro realizado com sucesso!",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const me = async (request: Request, response: Response) => {
  const token = request.cookies.token;

  if (!token) {
    response.status(401).json({
      message: "Não autenticado",
    });

    return;
  }

  const user = verifyToken(token);

  if (!user) {
    response.status(401).json({
      message: "Sessão inválida",
    });

    return;
  }

  response.json(user);
};

export const logout = (request: Request, response: Response) => {
  response.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  response.json({
    message: "Logout realizado com sucesso",
  });
};
