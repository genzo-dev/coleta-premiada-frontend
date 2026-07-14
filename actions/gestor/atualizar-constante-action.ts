"use server";

import { revalidatePath } from "next/cache";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import z from "zod";

const Schema = z.object({
  pontos_por_kg: z.coerce.number().min(0.0001, "O valor deve ser maior que 0"),
});

type ActionState = {
  errors: string[];
  success: boolean;
};

export async function atualizarConstanteAction(
  prevState: ActionState,
  formData: FormData,
) {
  const pontos_por_kg = formData.get("pontos_por_kg");

  const validatedFields = Schema.safeParse({
    pontos_por_kg,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues.map((e) => e.message),
      success: false,
    };
  }

  // Formatting to 2 decimal places string for the backend API
  const pontosFormatados = validatedFields.data.pontos_por_kg.toFixed(2);

  const res = await apiAuthenticatedRequest("/api/program/scoring-constant", {
    method: "PATCH",
    data: {
      pontos_por_kg: pontosFormatados,
    },
  });

  if (!res.success) {
    return {
      errors: res.errors,
      success: false,
    };
  }

  revalidatePath("/(dashboard)/(gestor)/constante-pontuacao", "page");

  return {
    success: true,
    errors: [],
  };
}
