"use client";

import { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PublicUserSchema } from "@/schemas/user/user-schema";
import { Loader2 } from "lucide-react";
import { createUserAction } from "@/actions/gestor/create-user-action";

const PERFIS_COM_CIDADE = ["gestor", "supervisor"];

export default function CreateUserForm({
  cidadeId,
}: {
  cidadeId?: number | null;
}) {
  const [perfil, setPerfil] = useState("morador");
  const [state, action, isPending] = useActionState(createUserAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      {cidadeId && PERFIS_COM_CIDADE.includes(perfil) && (
        <input type="hidden" name="cidade" value={cidadeId} />
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome de usuário:</Label>
        <Input
          id="nome"
          type="text"
          name="nome"
          placeholder="Digite seu nome..."
          disabled={isPending}
          defaultValue={state.user?.nome}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail:</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Digite seu e-mail..."
          disabled={isPending}
          defaultValue={state.user?.email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="perfil">Perfil:</Label>
        <select
          id="perfil"
          name="perfil"
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          disabled={isPending}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="morador">Morador</option>
          <option value="supervisor">Supervisor</option>
          <option value="gestor">Gestor</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Senha:</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Digite sua senha..."
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password2">Confirme a senha:</Label>
        <Input
          id="password2"
          type="password"
          name="password2"
          placeholder="Confirme sua senha..."
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-12 text-base bg-[#116F51] hover:bg-emerald-800 text-white mt-6"
      >
        {isPending ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          "Criar conta"
        )}
      </Button>

      {!!state?.errors && (
        <p className="text-red-600 text-sm mt-2">{state.errors[0]}</p>
      )}
    </form>
  );
}
