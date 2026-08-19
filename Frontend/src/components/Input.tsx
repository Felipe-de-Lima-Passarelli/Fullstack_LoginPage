//Next
import { SetStateAction } from "react";

//Utils
import { UserType } from "@/utils/ComponentsStyle";

//Interface
interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  UseState: UserType;
  setUseState: React.Dispatch<SetStateAction<UserType>>;
}

const Input = ({
  name,
  type,
  placeholder,
  UseState,
  setUseState,
}: InputProps) => {
  return (
    <label>
      <span className="font-semibold">{name}</span>
      <input
        type={type}
        name={name}
        className="block border border-gray-600 rounded-md w-50 md:w-85 p-2"
        placeholder={placeholder}
        value={
          name === "Nome"
            ? UseState?.Nome
            : name === "Email"
              ? UseState?.Email
              : name === "Senha"
                ? UseState?.Senha
                : UseState?.["Confirmar senha"]
        }
        onChange={(e) =>
          setUseState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
    </label>
  );
};

export default Input;
