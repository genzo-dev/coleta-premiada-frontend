import axios, { AxiosRequestConfig } from "axios";

type ApiRequestError = {
  errors: string[];
  success: false;
  status: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;

export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export async function apiRequest<T>(
  path: string,
  options?: AxiosRequestConfig,
): Promise<ApiRequest<T>> {
  const url = `${apiUrl}${path}`;

  try {
    const res = await axios({
      url,
      ...options,
    });

    return {
      success: true,
      data: res.data,
      status: res.status,
    };
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const response = err.response;

      if (response) {
        console.log("❌ BACKEND RESPONSE ERROR:", response.data);

        const data = response.data;

        let errors: string[] = [];

        if (data?.message) {
          errors = Array.isArray(data.message) ? data.message : [data.message];
        } else {
          errors = Object.values(data)
            .flat()
            .filter(Boolean)
            .map((err) => {
              const msg = String(err);
              return msg.charAt(0).toUpperCase() + msg.slice(1);
            });
        }

        return {
          success: false,
          errors,
          status: response.status,
        };
      }
    }

    console.log("❌ NETWORK ERROR:", err);

    return {
      success: false,
      errors: ["Falha ao conectar-se ao servidor"],
      status: 500,
    };
  }
}
