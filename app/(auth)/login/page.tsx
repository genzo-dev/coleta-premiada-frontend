import DefaultLink from "@/components/Link";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";
import { MdAccountCircle } from "react-icons/md";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center gap-2 mb-4">
        {<MdAccountCircle size={24} />} LOGIN
      </div>
      <LoginForm />

      <div className="text-center">
        <DefaultLink href="/register">Ainda não tem uma conta?</DefaultLink>
      </div>
    </div>
  );
}
