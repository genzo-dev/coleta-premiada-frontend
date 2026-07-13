"use client";

import { googleCadastroComplementarAction } from "@/actions/auth/google-cadastro-complementar-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { ChangeEvent } from "react";

function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export default function GoogleCadastroComplementarForm() {
  const initialState = { errors: [] as string[] };
  const [state, action, isPending] = useActionState(
    googleCadastroComplementarAction,
    initialState,
  );

  function handleCPFChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.value = maskCPF(e.target.value);
  }

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            name="nome"
            placeholder="Seu nome"
            disabled={isPending}
            autoComplete="given-name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="sobrenome">Sobrenome</Label>
          <Input
            id="sobrenome"
            name="sobrenome"
            placeholder="Seu sobrenome"
            disabled={isPending}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          name="cpf"
          placeholder="000.000.000-00"
          disabled={isPending}
          onChange={handleCPFChange}
          inputMode="numeric"
          maxLength={14}
          autoComplete="off"
        />
      </div>

      {state?.errors && state.errors.length > 0 && (
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
          "Concluir cadastro"
        )}
      </Button>
    </form>
  );
}
