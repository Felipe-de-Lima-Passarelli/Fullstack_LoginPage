"use client";

//Next
import { createContext, useContext, useState, ReactNode } from "react";

//Utils
import { UserLogged } from "@/utils/ComponentsStyle";

type UserContextType = {
  loggedUser: UserLogged;
  setLoggedUser: React.Dispatch<React.SetStateAction<UserLogged>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<UserLogged>({
    nome: "",
    email: "",
    id: "",
  });

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de UserProvider");
  }

  return context;
};
