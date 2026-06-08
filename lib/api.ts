import { createServerApi } from "./api/server";
import { api as clientApi } from "./api/client";

export const api = typeof window === "undefined" ? createServerApi() : clientApi;

export { createServerApi } from "./api/server";
export { api as apiClient } from "./api/client";