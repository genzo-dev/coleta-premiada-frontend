import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel do Supervisor",
};

// Redireciona o supervisor para a página de imóveis, já que o dashboard é exclusivo do gestor
export default function SupervisorDashboard() {
  redirect("/imoveis");
}
