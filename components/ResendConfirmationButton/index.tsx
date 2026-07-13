"use client";

import { useState, useTransition } from "react";
import { resendConfirmationAction } from "@/actions/auth/resend-confirmation-action";

export function ResendConfirmationButton() {
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    setError(null);
    startTransition(async () => {
      const result = await resendConfirmationAction();
      if (!result.success) {
        setError(result.errors?.[0] ?? "Erro ao reenviar e-mail.");
        return;
      }
      setSent(true);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 60_000);
    });
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        disabled={isPending || cooldown}
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
      >
        {isPending ? "Enviando..." : cooldown ? "Aguarde 60s" : "Reenviar e-mail"}
      </button>
      {sent && !error && (
        <p className="text-sm text-emerald-600">E-mail reenviado!</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
