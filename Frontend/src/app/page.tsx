"use client";

//Next
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

//Components
import InputLogin from "@/components/InputLogin";

//Utils
import { buttonsStyle, UserTypeLogin } from "@/utils/ComponentsStyle";

//User Context
import { useUser } from "@/context/UserContext";

export default function Home() {
  const [user, setUser] = useState<UserTypeLogin>({
    Email: "",
    Senha: "",
  });

  const [error, setError] = useState("");

  const { setLoggedUser } = useUser();

  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: user.Email,
          password: user.Senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setUser({
          Email: "",
          Senha: "",
        });
        return;
      }

      setLoggedUser({
        nome: data.name,
        email: data.email,
        id: data.id,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div className="bg-[#F4F6F9] w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-md p-8 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
        <div className="text-center">
          <h2 className="text-[#2563EB] font-semibold text-4xl">Login</h2>
          <p className="opacity-60">Entre na sua conta</p>
        </div>
        <div className="flex flex-col gap-2 mt-4 relative">
          <InputLogin
            name="Email"
            type="email"
            placeholder="Digite seu email"
            UseState={user}
            setUseState={setUser}
          />
          <InputLogin
            name="Senha"
            type="password"
            placeholder="Digite sua senha"
            UseState={user}
            setUseState={setUser}
          />
          <p className="text-red-500 font-semibold absolute -bottom-7">
            {error}
          </p>
        </div>
        <button className={buttonsStyle[0]} onClick={() => handleLogin()}>
          Entrar
        </button>
        <Link href="/register">
          <button className={buttonsStyle[1]}>Criar conta</button>
        </Link>
      </div>
    </div>
  );
}
