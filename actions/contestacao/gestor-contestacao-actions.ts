"use server";

import { revalidatePath } from "next/cache";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Contestacao } from "@/types/entities/contestacao";

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export async function buscarContestacoesGestorAction(params: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.set("page", String(params.page));
  if (params.limit) queryParams.set("limit", String(params.limit));
  if (params.status) queryParams.set("status", params.status);

  return await apiAuthenticatedRequest<PaginatedResponse<Contestacao>>(
    `/api/collection/disputes?${queryParams.toString()}`
  );
}

export async function obterTotalContestacoesAbertasAction() {
  const response = await apiAuthenticatedRequest<PaginatedResponse<Contestacao>>(
    `/api/collection/disputes?status=aberta&limit=1`
  );
  
  if (response.success && response.data) {
    return response.data.count;
  }
  return 0;
}

export async function resolverContestacaoAction(id: number, data: { status: string; resposta: string }) {
  const response = await apiAuthenticatedRequest<Contestacao>(
    `/api/collection/disputes/${id}`,
    {
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
