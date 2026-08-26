"use client";

//Next
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//Utils
import { buttonsStyle } from "@/utils/ComponentsStyle";

//User Context
import { useUser } from "@/context/UserContext";

export default function Page() {
  const router = useRouter();
  const { loggedUser, setLoggedUser, loading } = useUser();

  useEffect(() => {
    if (!loading && !loggedUser) {
      router.push("/");
    }
  }, [loading, loggedUser, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Verificando autenticação...</p>
      </div>
    );
  }

  if (!loggedUser) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoggedUser(null);
      router.push("/");
    }
  };

  return (
    <div className="bg-[#F4F6F9] w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row items-center justify-between bg-[#2563EB] rounded-t-md text-white py-4 px-10 w-80 md:w-120 xl:w-240 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
        <h2 className="font-semibold text-xl">Minha Conta</h2>
        <button className={buttonsStyle[2]} onClick={() => handleLogout()}>
          Sair
        </button>
      </div>
      <div className="bg-white w-80 md:w-120 xl:w-240 p-[3%] rounded-b-md">
        <div className="bg-[#F7F7F7] p-[4%] rounded-md">
          <h1 className="mb-2 font-semibold text-2xl">Bem-vindo!</h1>
          <div className="flex flex-col gap-0.5">
            <p>
              <span className="font-semibold">Nome:</span> {loggedUser.nome}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {loggedUser.email}
            </p>
            <p>
              <span className="font-semibold">ID:</span> {loggedUser.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
