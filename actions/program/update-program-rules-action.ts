"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { Program } from "@/schemas/programs/programs-schema";
import { updateProgramRulesSchema } from "@/schemas/programs/update-program-rules-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

export type UpdateProgramRulesState = {
  pontos_por_real?: number;
  minimo_para_beneficio?: number;
  permite_acumulo_ciclos?: boolean;
};

type UpdateProgramRulesActionState = {
  programRules: UpdateProgramRulesState;
  errors: string[];
  success: boolean;
};

export async function updateProgramRulesAction(
  state: UpdateProgramRulesActionState,
  formData: FormData,
): Promise<UpdateProgramRulesActionState> {
  if (!(formData instanceof FormData)) {
    return {
      programRules: state?.programRules,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const rawId = formData.get("id");

  if (!rawId) {
    return {
      programRules: state?.programRules,
      errors: ["ID não informado"],
      success: false,
    };
  }

  const id = Number(rawId);

  if (Number.isNaN(id)) {
    return {
      programRules: state?.programRules,
      errors: ["ID inválido"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = updateProgramRulesSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      programRules: formObj as unknown as UpdateProgramRulesState,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const registerResponse = await apiAuthenticatedRequest<Program>(
    `/api/program/programs/${id}/rules`,
    {
      method: "PATCH",
      data: parsedFormData.data,
    },
  );

  if (!registerResponse.success) {
    return {
      programRules: parsedFormData.data,
      errors: registerResponse.errors,
      success: registerResponse.success,
    };
  }

  redirect(`/programas/${id}`);
}
