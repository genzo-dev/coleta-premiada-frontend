import { redirect } from "next/navigation";

// Redireciona o supervisor para a página de imóveis, já que o dashboard é exclusivo do gestor
export default function SupervisorDashboard() {
  redirect("/imoveis");
}
