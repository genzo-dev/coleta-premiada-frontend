"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/actions/auth/register-action";
import { PublicUserSchema } from "@/schemas/user/user-schema";
import { Loader2 } from "lucide-react";

export default function FormRegister() {
  const [state, action, isPending] = useActionState(registerAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
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
        {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "Criar conta"}
      </Button>

      {!!state?.errors && <p className="text-red-600 text-sm mt-2">{state.errors[0]}</p>}
    </form>
  );
}
