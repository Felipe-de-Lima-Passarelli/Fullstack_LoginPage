import { Router } from "express";
import { login, register } from "./controller/user-controller.js";
export const router = Router();
//Rotas de usuário
router.post("/login", login);
router.post("/cadastro", register);
//# sourceMappingURL=routes.js.map