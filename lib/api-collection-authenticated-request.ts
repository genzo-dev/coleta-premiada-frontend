import "server-only";

import axios, { AxiosRequestConfig } from "axios";
import { getTokens } from "./auth/manage-login";
import { ApiRequest } from "./api-request";

const collectionApiUrl =
  process.env.COLLECTION_API_URL || "http://localhost:8002";

export async function apiCollectionAuthenticatedRequest<T>(
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

  const url = `${collectionApiUrl}${path}`;
  console.log(url)
  console.log(jwtToken.accessToken)
  try {
    const res = await axios({
      url,
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${jwtToken.accessToken}`,
      },
    });

    return { success: true, data: res.data, status: res.status };
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      console.log("❌ COLLECTION MS ERROR:", err.response.data);

      const data = err.response.data;
      let errors: string[] = [];

      if (typeof data === "string") {
        errors = [data];
      } else if (data?.message) {
        errors = Array.isArray(data.message) ? data.message : [data.message];
      } else if (data?.detail) {
        errors = [String(data.detail)];
      } else {
        errors = Object.values(data)
          .flat()
          .filter(Boolean)
          .map((e) => {
            const msg = String(e);
            return msg.charAt(0).toUpperCase() + msg.slice(1);
          });
      }

      return { success: false, errors, status: err.response.status };
    }

    console.log("❌ COLLECTION MS NETWORK ERROR:", err);
    return {
      success: false,
      errors: ["Falha ao conectar-se ao servidor de coletas."],
      status: 500,
    };
  }
}
