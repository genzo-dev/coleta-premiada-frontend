"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";

export async function resendConfirmationAction() {
  const res = await apiAuthenticatedRequest(
    "/api/accounts/auth/reenviar-confirmacao/",
    { method: "POST" },
  );

  if (!res.success) {
    return { success: false, errors: res.errors };
  }

  return { success: true };
}
