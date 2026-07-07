"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { revalidatePath } from "next/cache";

export type DeactivateUserActionResult = {
  success: boolean;
  errors?: string[];
};

export async function deactivateUserAction(
  id: number,
): Promise<DeactivateUserActionResult> {
  const res = await apiAuthenticatedRequest<null>(`/api/accounts/users/${id}`, {
    method: "DELETE",
  });

  if (!res.success) {
    return { success: false, errors: res.errors };
  }

  revalidatePath("/usuarios");
  return { success: true };
}
