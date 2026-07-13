"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { CreateCidadeSchema } from "@/schemas/cidade/create-cidade-schema";
import { Cidade } from "@/schemas/cidade/cidade-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

export type CreateCidadeFormState = {
  nome: string;
  uf: string;
  ativo?: boolean;
};

type CreateCidadeActionState = {
  cidade: CreateCidadeFormState;
  errors: string[];
  success: boolean;
};

export async function createCidadeAction(
  state: CreateCidadeActionState,
  formData: FormData,
): Promise<CreateCidadeActionState> {
  if (!(formData instanceof FormData)) {
    return {
      cidade: state?.cidade,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateCidadeSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      cidade: formObj as unknown as CreateCidadeFormState,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const registerResponse = await apiAuthenticatedRequest<Cidade>(
    "/api/accounts/cidades",
    {
      method: "POST",
      data: parsedFormData.data,
    },
  );

  if (!registerResponse.success) {
    return {
      cidade: parsedFormData.data,
      errors: registerResponse.errors,
      success: registerResponse.success,
    };
  }

  redirect("/cidades");
}
