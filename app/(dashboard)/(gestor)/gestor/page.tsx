import { redirect } from "next/navigation";

// Redireciona o acesso à rota antiga de gestor para a rota padrão de dashboard
export default function GestorDashboard() {
  redirect("/dashboard");
}
