import RegisterForm from "@/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
