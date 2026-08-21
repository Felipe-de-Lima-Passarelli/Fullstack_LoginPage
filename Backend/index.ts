import express from "express";
import { connection } from "./src/db.js";
import cors from "cors";
import { router } from "./src/routes.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://fullstack-login-page-kappa.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(router);

connection();

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
