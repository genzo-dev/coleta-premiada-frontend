"use client";

import { useActionState } from "react";
import { definirSenhaAction } from "@/actions/auth/definir-senha-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function DefinirSenhaForm({ token }: { token: string }) {
  const [state, action, isPending] = useActionState(definirSenhaAction, {
    token,
    errors: [],
  });

  if (!token) {
    return (
      <div className="w-full max-w-[440px] px-8">
        <p className="text-red-600 text-sm">
          Link de convite inválido ou expirado. Solicite um novo cadastro ao
          administrador.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] px-8">
      <div className="font-bold text-lg uppercase mb-2 text-foreground">
        Bem-vindo ao Coleta Premiada
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Defina sua senha para acessar o sistema. Em seguida você irá completar
        seu cadastro.
      </p>

      <form action={action} className="flex flex-col gap-4 w-full" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Mínimo de 8 caracteres"
            disabled={isPending}
            autoComplete="new-password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password2">Confirme a senha</Label>
          <Input
            id="password2"
            name="password2"
            type="password"
            placeholder="Repita a senha"
            disabled={isPending}
            autoComplete="new-password"
          />
        </div>

        {state.errors.length > 0 && (
          <ul className="text-red-600 text-sm space-y-1">
            {state.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 text-base bg-[#116F51] hover:bg-emerald-800 text-white mt-2"
        >
          {isPending ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Definir senha e continuar"
          )}
        </Button>
      </form>
    </div>
  );
}
