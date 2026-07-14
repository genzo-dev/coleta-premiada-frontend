"use client";

import { useEffect, useTransition } from "react";
import { confirmEmailAction } from "@/actions/auth/confirm-email-action";
import Link from "next/link";
import { useState } from "react";

type State = "loading" | "success" | "error";

export function ConfirmarEmail({ token }: { token?: string }) {
  const [state, setState] = useState<State>(token ? "loading" : "error");
  const [errorMsg, setErrorMsg] = useState<string>(
    token ? "" : "Token não encontrado na URL.",
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!token) return;

    startTransition(async () => {
      try {
        const result = await confirmEmailAction(token);
        if (result && !result.success) {
          setErrorMsg(result.errors?.[0] ?? "Erro ao confirmar e-mail.");
          setState("error");
        }
      } catch {
        setState("success");
      }
    });
  }, [token]);

  if (state === "loading") {
    return <p className="text-muted-foreground">Confirmando seu e-mail...</p>;
  }

  if (state === "error") {
    return (
      <div className="flex flex-col items-center gap-4 max-w-sm text-center">
        <p className="text-destructive">{errorMsg}</p>
        <Link
          href="/confirmar-email/pendente"
          className="text-sm underline text-muted-foreground hover:text-foreground"
        >
          Reenviar e-mail de confirmação
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 max-w-sm text-center">
      <p className="text-emerald-600 font-medium">
        E-mail confirmado! Você já pode fazer login.
      </p>
      <Link href="/login" className="text-sm underline text-muted-foreground hover:text-foreground">
        Ir para o login
      </Link>
    </div>
  );
}
