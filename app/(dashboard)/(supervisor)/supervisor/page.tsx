import { redirect } from "next/navigation";

// Redireciona a rota antiga de supervisor para a nova rota padrão do dashboard
export default function SupervisorDashboard() {
  redirect("/dashboard");
}
