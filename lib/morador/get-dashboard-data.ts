import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { Imovel } from "@/types/entities/imovel";
import { Beneficio } from "@/types/entities/beneficio";

// Fetch the resident's properties
export async function getMoradorImoveis(): Promise<Imovel[]> {
  const response = await apiAuthenticatedRequest<any>("/api/program/properties?limit=1");
  if (!response.success || !response.data) return [];
  
  const results = Array.isArray(response.data) ? response.data : response.data.results;
  return results || [];
}

// Fetch the active program
export async function getActiveProgramId(): Promise<number | null> {
  const response = await apiAuthenticatedRequest<any>("/api/program/programs?limit=1&status=ativo");
  if (!response.success || !response.data) return null;
  
  const results = Array.isArray(response.data) ? response.data : response.data.results;
  if (!results || results.length === 0) return null;
  
  return results[0].id;
}

// Fetch benefits
export async function getBeneficios(propertyId: number, programaId: number): Promise<Beneficio | null> {
  const response = await apiAuthenticatedRequest<Beneficio>(`/api/program/benefits/${propertyId}/${programaId}`);
  if (!response.success) return null;
  return response.data;
}

// Get all dashboard data
export async function getDashboardData() {
  const imoveis = await getMoradorImoveis();
  if (imoveis.length === 0) {
    return { hasImovel: false, beneficio: null };
  }
  
  const activeProgramId = await getActiveProgramId();
  if (!activeProgramId) {
    return { hasImovel: true, beneficio: null };
  }

  const beneficio = await getBeneficios(imoveis[0].id, activeProgramId);
  return { hasImovel: true, beneficio };
}
