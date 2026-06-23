"use client";

import { useActionState } from "react";
import InputText from "../InputText";
import Button from "../Button";
import { registerAction } from "@/actions/auth/register-action";
import { PublicUserSchema } from "@/schemas/user/user-schema";
import { BiLoaderCircle } from "react-icons/bi";

export default function FormRegister() {
  const [state, action, isPending] = useActionState(registerAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <InputText
        labelText="Nome de usuário:"
        type="text"
        name="nome"
        placeholder="Digite seu nome..."
        disabled={isPending}
        defaultValue={state.user?.nome}
      />

      <InputText
        labelText="E-mail:"
        type="email"
        name="email"
        placeholder="Digite seu e-mail..."
        disabled={isPending}
        defaultValue={state.user?.email}
      />

      <label>Perfil</label>
      <select name="perfil">
        <option value="morador">Morador</option>
        <option value="supervisor">Supervisor</option>
        <option value="gestor">Gestor</option>
      </select>

      <InputText
        labelText="Senha:"
        type="password"
        name="password"
        placeholder="Digite sua senha..."
        disabled={isPending}
      />

      <InputText
        labelText="Confirme a senha:"
        type="password"
        name="password2"
        placeholder="Digite sua senha..."
        disabled={isPending}
      />

      <Button type="submit" disabled={isPending}>
        {!isPending && "Criar conta"}
        {isPending && <BiLoaderCircle className="animate-spin" size={20} />}
      </Button>

      {!!state?.errors && <p className="text-red-600">{state.errors[0]}</p>}
    </form>
  );
}
