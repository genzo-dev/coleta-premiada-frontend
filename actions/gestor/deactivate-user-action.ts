"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { revalidatePath } from "next/cache";

export type ToggleActiveActionState = {
  errors: string[];
  success: boolean;
};

export async function toggleActiveAction(
  _prevState: ToggleActiveActionState,
  formData: FormData,
): Promise<ToggleActiveActionState> {
  const userId = formData.get("userId");
  const type = formData.get("type"); // "activate" | "deactivate"

  if (!userId || !type) {
    return { errors: ["Dados inválidos"], success: false };
  }

  const ativo = type === "activate";

  const res = await apiAuthenticatedRequest(`/api/accounts/users/${userId}`, {
    method: "PATCH",
    data: { ativo },
  });

  if (!res.success) {
    return { errors: res.errors, success: false };
  }

  revalidatePath("/usuarios");
  return { errors: [], success: true };
}
