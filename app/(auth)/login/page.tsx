import LoginForm from "@/components/LoginForm";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      LOGIN PAGE
      <LoginForm />
      {currentUser && <p>Logado como: {currentUser.perfil}</p>}
    </div>
  );
}
