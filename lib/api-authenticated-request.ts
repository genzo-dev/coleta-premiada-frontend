import { AxiosRequestConfig } from "axios";
import { apiRequest, ApiRequest } from "./api-request";
import { getTokens } from "./auth/manage-login";

export async function apiAuthenticatedRequest<T>(
  path: string,
  options?: AxiosRequestConfig,
): Promise<ApiRequest<T>> {
  const jwtToken = await getTokens();

  if (!jwtToken?.accessToken) {
    return {
      success: false,
      errors: ["Usuário não autenticado."],
      status: 401,
    };
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${jwtToken.accessToken}`,
  };

  return apiRequest<T>(path, {
    ...options,
    headers,
  });
}
