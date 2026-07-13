import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";
import { User } from "lucide-react";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ confirmado?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="w-full max-w-[400px] px-8">
      <div className="font-bold text-lg uppercase flex items-center gap-2 mb-8 text-foreground">
        <User className="w-6 h-6" />
        LOGIN
      </div>

      {params.confirmado === "1" && (
        <div className="mb-4 rounded-md bg-emerald-100 p-3 text-sm text-emerald-800">
          E-mail confirmado com sucesso! Faça login para continuar.
        </div>
      )}

      <LoginForm />

      <Link
        href="/register"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2 text-center block"
      >
        Ainda não tem uma conta?
      </Link>

      <div className="flex items-center justify-center gap-4 mt-6">
        <GoogleAuthButton />
      </div>
    </div>
  );
}
