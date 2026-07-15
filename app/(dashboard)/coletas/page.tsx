export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// Para evitar conflito de rotas duplicadas no Next.js (Turbopack),
// já que as pastas de grupos de rotas (morador) e (supervisor) são virtuais e
// ambas geravam o caminho final "/coletas", centralizamos a rota "/coletas" neste arquivo.
// Este Server Component identifica o perfil do usuário logado e renderiza a view correspondente.
import MoradorColetasView from "../(morador)/coletas/morador-coletas-view";
import SupervisorColetasView from "../(supervisor)/coletas/supervisor-coletas-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coletas",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ColetasPage(props: {
  searchParams: SearchParams;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.perfil === "morador") {
    return <MoradorColetasView />;
  }

  // Supervisor e Gestor têm acesso ao histórico geral de coletas
  return <SupervisorColetasView searchParams={props.searchParams} />;
}
