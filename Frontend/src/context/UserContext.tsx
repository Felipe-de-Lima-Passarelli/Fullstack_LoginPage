"use client";

// React
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Utils
import { UserLogged } from "@/utils/ComponentsStyle";

//ContextUser Type
type UserContextType = {
  loggedUser: UserLogged | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<UserLogged | null>>;
  loading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<UserLogged | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          setLoggedUser(null);
          return;
        }

        const data = await response.json();

        setLoggedUser({
          nome: data.name,
          email: data.email,
          id: data.id,
        });
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setLoggedUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser, loading }}>
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
