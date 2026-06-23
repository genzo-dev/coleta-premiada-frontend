import LoginForm from "@/components/LoginForm";
import { getCurrentUser } from "@/lib/auth/get-current-user";

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
