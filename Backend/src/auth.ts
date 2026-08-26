//Token
import jwt from "jsonwebtoken";

//User Type
export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export function createToken(user: AuthUser) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não configurado");
  }

  return jwt.sign(user, secret, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string): AuthUser | null {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não configurado");
  }

  try {
    return jwt.verify(token, secret) as AuthUser;
  } catch {
    return null;
  }
}
