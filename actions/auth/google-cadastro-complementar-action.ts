"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import {
  GoogleCadastroComplementarSchema,
} from "@/schemas/auth/google-cadastro-complementar-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

type State = {
  errors: string[];
};

export async function googleCadastroComplementarAction(
  _prevState: State | undefined,
  formData: FormData,
): Promise<State> {
  const formObj = Object.fromEntries(formData.entries());

  const parsed = GoogleCadastroComplementarSchema.safeParse(formObj);
  if (!parsed.success) {
    return { errors: getZodErrorMessages(parsed.error.format()) };
  }

  const response = await apiAuthenticatedRequest<{ detail: string }>(
    "/api/accounts/auth/completar-cadastro",
    {
      method: "PATCH",
      data: parsed.data,
    },
  );

  if (!response.success) {
    return { errors: response.errors };
  }

  // Busca perfil atualizado para redirecionar corretamente
  const user = await getCurrentUser();
  if (user?.perfil === "gerente_geral") redirect("/usuarios");
  if (user?.perfil === "gestor") redirect("/dashboard");
  if (user?.perfil === "supervisor") redirect("/imoveis");
  redirect("/morador");
}
