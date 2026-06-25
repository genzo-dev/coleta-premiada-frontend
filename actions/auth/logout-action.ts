"use server";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { clearTokens } from "@/lib/auth/manage-login";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await apiAuthenticatedRequest("/api/accounts/auth/logout", {
    method: "POST",
  });

  await clearTokens();

  redirect("/login");
}
