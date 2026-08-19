//Next
import { SetStateAction } from "react";

//Utils
import { UserTypeLogin } from "@/utils/ComponentsStyle";

//Interface
interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  UseState: UserTypeLogin;
  setUseState: React.Dispatch<SetStateAction<UserTypeLogin>>;
}

const InputLogin = ({
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
        value={name === "Email" ? UseState.Email : UseState.Senha}
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

export default InputLogin;
