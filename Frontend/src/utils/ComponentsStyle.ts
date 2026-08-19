//Button Styles
export const buttonsStyle = [
  "mt-8 p-2 w-full rounded-md text-white font-semibold bg-[#2563EB] cursor-pointer hover:bg-[#5073c0] duration-300",
  "w-full mx-auto mt-1 text-[#2563EB] cursor-pointer hover:underline",
  "text-[#2563EB] font-semibold bg-white py-2 px-4 rounded-md cursor-pointer",
];

//User Type
export type UserType = {
  Nome: string;
  Email: string;
  Senha: string;
  "Confirmar senha": string;
};

export type UserTypeLogin = {
  Email: string;
  Senha: string;
};

export type UserLogged = {
  nome: string;
  email: string;
  id: string;
};
