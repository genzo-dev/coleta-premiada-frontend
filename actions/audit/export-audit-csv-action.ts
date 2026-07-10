"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";

export async function exportAuditCsvAction(searchParamsStr: string) {
  const res = await apiAuthenticatedRequest<string>(
    `/api/audit/logs/export?formato=csv&${searchParamsStr}`,
    {
      method: "GET",
      responseType: "text",
    },
  );

  if (!res.success) {
    return { success: false, errors: res.errors };
  }

  return { success: true, data: res.data };
}
