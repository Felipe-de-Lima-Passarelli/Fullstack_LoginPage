//Express
import type { NextFunction, Request, Response } from "express";

//Token
import { verifyToken } from "../auth.js";

export const authenticate = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
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
      message: "Sessão inválida ou expirada",
    });

    return;
  }

  next();
};
