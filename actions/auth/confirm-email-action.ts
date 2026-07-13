"use server";

import { apiRequest } from "@/lib/api-request";
import { redirect } from "next/navigation";

export async function confirmEmailAction(token: string) {
  const res = await apiRequest("/api/accounts/auth/confirmar-email/", {
    method: "POST",
    data: { token },
  });

  if (!res.success) {
    return { success: false, errors: res.errors };
  }

  redirect("/login?confirmado=1");
}
