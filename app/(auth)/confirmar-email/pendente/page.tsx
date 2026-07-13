import { ResendConfirmationButton } from "@/components/ResendConfirmationButton";

export default async function PendenteConfirmacaoPage({
  searchParams,
}: {
  searchParams: Promise<{ origem?: string }>;
}) {
  const params = await searchParams;
  const isCadastro = params.origem === "cadastro";

  return (
    <div className="flex flex-col items-center gap-4 max-w-sm text-center">
      <h1 className="text-xl font-bold">Confirme seu e-mail</h1>
      <p className="text-muted-foreground">
        {isCadastro
          ? "Sua conta foi criada. Enviamos um link de confirmação para o seu e-mail."
          : "Você precisa confirmar seu e-mail para acessar o sistema."}
      </p>
      <p className="text-sm text-muted-foreground">
        Não recebeu? Verifique sua caixa de spam ou reenvie abaixo.
      </p>
      {!isCadastro && <ResendConfirmationButton />}
    </div>
  );
}
