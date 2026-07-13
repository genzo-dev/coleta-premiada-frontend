import { ConfirmarEmail } from "@/components/ConfirmarEmail";

export default async function ConfirmarEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  return <ConfirmarEmail token={params.token} />;
}
