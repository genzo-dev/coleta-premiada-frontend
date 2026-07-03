"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  updateUserAction,
  UpdateUserFormState,
} from "@/actions/user/update-user-action";
import { UpdateUserDto } from "@/schemas/user/update-user-schema";

type UpdateUserFormProps = {
  user: UpdateUserDto;
};

export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const initialProgram: UpdateUserFormState = {
    nome: user.nome,
    cpf: user.cpf ?? "",
  };

  const [state, action, isPending] = useActionState(updateUserAction, {
    user: initialProgram,
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Seu nome:</Label>
        <Input
          id="nome"
          name="nome"
          placeholder="Digite seu nome..."
          disabled={isPending}
          defaultValue={state.user?.nome}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="cpf">CPF:</Label>
        <Input
          id="cpf"
          name="cpf"
          placeholder="Digite sei CPF..."
          disabled={isPending}
          defaultValue={state.user?.cpf}
        />
      </div>

      {!!state?.errors?.length && (
        <p className="text-red-600 text-sm">{state.errors[0]}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-12 text-base bg-[#116F51] hover:bg-emerald-800 text-white mt-6"
      >
        {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "Atualizar"}
      </Button>
    </form>
  );
}
