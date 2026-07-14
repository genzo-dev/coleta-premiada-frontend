"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { AnalyzeDisputeSchema } from "@/schemas/dispute/analyze-dispute-schema";
import { Contestacao } from "@/types/entities/contestacao";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

export type AnalyzeDisputeFormState = {
  status: string;
  resposta?: string;
};

type AnalyzeDisputeActionState = {
  dispute: AnalyzeDisputeFormState;
  errors: string[];
  success: boolean;
};

export async function analyzeDisputeAction(
  state: AnalyzeDisputeActionState,
  formData: FormData,
): Promise<AnalyzeDisputeActionState> {
  if (!(formData instanceof FormData)) {
    return {
      dispute: state?.dispute,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const rawId = formData.get("id");

  if (!rawId) {
    return {
      dispute: state?.dispute,
      errors: ["ID não informado"],
      success: false,
    };
  }

  const id = Number(rawId);

  if (Number.isNaN(id)) {
    return {
      dispute: state?.dispute,
      errors: ["ID inválido"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = AnalyzeDisputeSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      dispute: formObj as unknown as AnalyzeDisputeFormState,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const registerResponse = await apiAuthenticatedRequest<Contestacao>(
    `/api/collection/disputes/${id}`,
    {
      method: "PATCH",
      data: parsedFormData.data,
    },
  );

  if (!registerResponse.success) {
    return {
      dispute: parsedFormData.data,
      errors: registerResponse.errors,
      success: registerResponse.success,
    };
  }

  redirect("/contestacoes");
}
