"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { CreateProgramSchema } from "@/schemas/programs/create-program-schema";
import { Program } from "@/schemas/programs/programs-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

export type CreateProgramFormState = {
  nome: string;
  descricao?: string;
  data_inicio: Date | string | undefined;
  data_fim: Date | string | undefined;
  ativo?: boolean;
  desconto_maximo?: number;
};

type CreateProgramActionState = {
  program: CreateProgramFormState;
  errors: string[];
  success: boolean;
};

export async function createProgramAction(
  state: CreateProgramActionState,
  formData: FormData,
): Promise<CreateProgramActionState> {
  if (!(formData instanceof FormData)) {
    return {
      program: state?.program,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateProgramSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      program: formObj as unknown as CreateProgramFormState,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const registerResponse = await apiAuthenticatedRequest<Program>(
    "/api/program/programs",
    {
      method: "POST",
      data: parsedFormData.data,
    },
  );

  if (!registerResponse.success) {
    return {
      program: parsedFormData.data,
      errors: registerResponse.errors,
      success: registerResponse.success,
    };
  }

  redirect("/programas");
}
