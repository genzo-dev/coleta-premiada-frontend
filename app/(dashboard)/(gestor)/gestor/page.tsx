import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel do Gestor",
};

// Redireciona o acesso à rota antiga de gestor para a rota padrão de dashboard
export default function GestorDashboard() {
  redirect("/dashboard");
}
