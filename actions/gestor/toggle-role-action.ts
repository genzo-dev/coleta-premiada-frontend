"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { revalidatePath } from "next/cache";

export type ToggleRoleActionState = {
  errors: string[];
  success: boolean;
};

export async function toggleRoleAction(
  _prevState: ToggleRoleActionState,
  formData: FormData,
): Promise<ToggleRoleActionState> {
  const userId = formData.get("userId");
  const roleId = formData.get("roleId");
  const type = formData.get("type");

  if (!userId || !roleId || !type) {
    return { errors: ["Dados inválidos"], success: false };
  }

  const method = type === "assign" ? "POST" : "DELETE";

  const res = await apiAuthenticatedRequest(
    `/api/accounts/users/${userId}/roles/${roleId}`,
    { method },
  );

  if (!res.success) {
    return { errors: res.errors, success: false };
  }

  revalidatePath("/usuarios");
  return { errors: [], success: true };
}
