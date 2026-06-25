import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  return (
    <div className="w-full max-w-[400px] px-8">
      <div className="font-bold text-lg uppercase flex items-center gap-2 mb-8 text-foreground">
        <User className="w-6 h-6" />
        LOGIN
      </div>
      
      <LoginForm />

      <Link
        href="/register"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2 text-center block"
      >
        Ainda não tem uma conta?
      </Link>
    </div>
  );
}
