//Express
import { Router } from "express";

//userController Function
import { login, register, me, logout } from "./controller/user-controller.js";

//Authenticator
import { authenticate } from "./middleware/auth.js";

export const router = Router();

//Rotas de usuário
router.get("/me", authenticate, me);
router.post("/login", login);
router.post("/cadastro", register);
router.post("/logout", logout);
