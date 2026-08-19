"use client";

//Next
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

//Components
import Input from "@/components/Input";

//Utils
import { buttonsStyle } from "@/utils/ComponentsStyle";
import { UserType } from "@/utils/ComponentsStyle";

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState<UserType>({
    Nome: "",
    Email: "",
    Senha: "",
    "Confirmar senha": "",
  });

  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (user.Nome === "") {
      setError("Nome inválido");
      return;
    } else if (user.Email === "") {
      setError("Email inválido");
      return;
    } else if (user.Senha === "" || user.Senha !== user["Confirmar senha"]) {
      setError("Senha inválida");
      return;
    }
    const response = await fetch("http://localhost:3001/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.Nome,
        email: user.Email,
        password: user.Senha,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setUser({ Nome: "", Email: "", Senha: "", "Confirmar senha": "" });
      setError(data.message);
      return;
    }

    router.push("/");
  };

  return (
    <div className="bg-[#F4F6F9] w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-md p-8 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
        <div className="text-center">
          <h2 className="text-[#2563EB] font-semibold text-4xl">Cadastro</h2>
          <p className="opacity-60">Crie sua conta</p>
        </div>
        <div className="flex flex-col gap-2 mt-4 relative">
          <Input
            name="Nome"
            type="text"
            placeholder="Digite seu nome"
            UseState={user}
            setUseState={setUser}
          />
          <Input
            name="Email"
            type="email"
            placeholder="Digite seu email"
            UseState={user}
            setUseState={setUser}
          />
          <Input
            name="Senha"
            type="password"
            placeholder="Digite sua senha"
            UseState={user}
            setUseState={setUser}
          />
          <Input
            name="Confirmar senha"
            type="password"
            placeholder="Confirme sua senha"
            UseState={user}
            setUseState={setUser}
          />
          <p className="text-red-500 font-semibold absolute -bottom-7">
            {error}
          </p>
        </div>
        <button className={buttonsStyle[0]} onClick={() => handleRegister()}>
          Cadastrar
        </button>
        <Link href="./">
          <button className={buttonsStyle[1]}>Já possui conta?</button>
        </Link>
      </div>
    </div>
  );
}
