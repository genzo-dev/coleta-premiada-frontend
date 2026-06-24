"use client";

import { loginAction } from "@/actions/auth/login-action";
import { useActionState } from "react";
import InputText from "../InputText";
import Button from "../Button";
import { BiLoaderCircle } from "react-icons/bi";

export default function LoginForm() {
  const initialState = {
    email: "",
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <InputText
        labelText="E-mail:"
        type="email"
        name="email"
        placeholder="Digite seu e-mail..."
        disabled={isPending}
        defaultValue={state?.email}
      />

      <InputText
        labelText="Senha:"
        type="password"
        name="password"
        placeholder="Digite sua senha..."
        disabled={isPending}
      />

      <Button type="submit" disabled={isPending}>
        {!isPending && "Entrar"}
        {isPending && <BiLoaderCircle className="animate-spin" size={20} />}
      </Button>

      {!!state?.errors && <p className="text-red-600">{state.errors}</p>}
    </form>
  );
}
