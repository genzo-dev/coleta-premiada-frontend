import { Metadata } from "next";
import DefinirSenhaForm from "./definir-senha-form";

export const metadata: Metadata = {
  title: "Definir senha",
};

export default async function DefinirSenhaPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  return <DefinirSenhaForm token={params.token ?? ""} />;
}
