import { ConfirmarEmail } from "@/components/ConfirmarEmail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmar Email",
};

export default async function ConfirmarEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  return <ConfirmarEmail token={params.token} />;
}
