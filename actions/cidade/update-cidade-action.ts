"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { CreateCidadeSchema } from "@/schemas/cidade/create-cidade-schema";
import { Cidade } from "@/schemas/cidade/cidade-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

export type UpdateCidadeFormState = {
  nome: string;
  uf: string;
  ativo?: boolean;
};

type UpdateCidadeActionState = {
  cidade: UpdateCidadeFormState;
  errors: string[];
  success: boolean;
};

export async function updateCidadeAction(
  state: UpdateCidadeActionState,
  formData: FormData,
): Promise<UpdateCidadeActionState> {
  if (!(formData instanceof FormData)) {
    return {
      cidade: state?.cidade,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const rawId = formData.get("id");

  if (!rawId) {
    return {
      cidade: state?.cidade,
      errors: ["ID não informado"],
      success: false,
    };
  }

  const id = Number(rawId);

  if (Number.isNaN(id)) {
    return {
      cidade: state?.cidade,
      errors: ["ID inválido"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateCidadeSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      cidade: formObj as unknown as UpdateCidadeFormState,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const registerResponse = await apiAuthenticatedRequest<Cidade>(
    `/api/accounts/cidades/${id}`,
    {
      method: "PATCH",
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
