"use server";

import { apiRequest } from "@/lib/api-request";
import { setTokens } from "@/lib/auth/manage-login";
import { redirect } from "next/navigation";

type GoogleAuthActionState = {
  code: string;
  redirect_uri: string;
  errors: string[];
};

export default async function googleAuthAction(
  state: GoogleAuthActionState | undefined,
) {
  if (!state?.code || !state?.redirect_uri) {
    return {
      code: "",
      redirect_uri: "",
      errors: ["Código do Google não fornecido"],
    };
  }

  const response = await apiRequest<{
    access: string;
    refresh: string;
  }>("/api/accounts/auth/google", {
    method: "POST",
    data: {
      code: state?.code,
      redirect_uri: state?.redirect_uri,
    },
  });

  if (!response.success) {
    return {
      code: state?.code || "",
      redirect_uri: state?.redirect_uri || "",
      errors: response.errors,
    };
  }

  await setTokens(response.data.access, response.data.refresh);

  redirect("/");
}
