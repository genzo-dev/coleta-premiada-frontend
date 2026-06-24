import DefaultLink from "@/components/Link";
import RegisterForm from "@/components/RegisterForm";
import { Metadata } from "next";
import { MdAccountCircle } from "react-icons/md";

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function RegisterPage() {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center gap-2 mb-4">
        {<MdAccountCircle size={24} />} CADASTRO
      </div>
      <RegisterForm />

      <div className="text-center">
        <DefaultLink href="/login">Já possui uma conta?</DefaultLink>
      </div>
    </div>
  );
}
