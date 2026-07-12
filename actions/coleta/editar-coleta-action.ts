"use server";

import { revalidatePath } from "next/cache";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { RegistroColeta } from "@/types/entities/registro-coleta";

export async function editarColetaAction(id: number, data: { peso_kg: string }) {
  const response = await apiAuthenticatedRequest<RegistroColeta>(
    `/api/collection/collections/${id}`,
    {
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.success) {
    revalidatePath("/(dashboard)/(supervisor)/coletas", "page");
    revalidatePath("/(dashboard)/(gestor)/coletas", "page");
  }

  return response;
}
