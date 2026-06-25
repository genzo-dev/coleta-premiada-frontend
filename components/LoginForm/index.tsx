"use client";

import { loginAction } from "@/actions/auth/login-action";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const initialState = {
    email: "",
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail:</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Digite seu e-mail..."
          disabled={isPending}
          defaultValue={state?.email}
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

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-12 text-base bg-[#116F51] hover:bg-emerald-800 text-white mt-6"
      >
        {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "Entrar"}
      </Button>

      {!!state?.errors && <p className="text-red-600 text-sm mt-2">{state.errors}</p>}
    </form>
  );
}
