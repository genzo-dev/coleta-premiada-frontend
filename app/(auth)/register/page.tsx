import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import { Metadata } from "next";
import { User } from "lucide-react";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-[400px] px-8">
      <div className="font-bold text-lg uppercase flex items-center gap-2 mb-8 text-foreground">
        <User className="w-6 h-6" />
        CADASTRO
      </div>

      <RegisterForm />

      <Link
        href="/login"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2 text-center block"
      >
        Já possui uma conta?
      </Link>

      <div className="flex items-center justify-center gap-4 mt-6">
        <GoogleAuthButton />
      </div>
    </div>
  );
}
