import { apiUrl } from "./api-request";

/**
 * Constrói a URL completa do proxy de imagem a partir do caminho
 * relativo armazenado no MinIO (ex: "evidencias/uuid.jpg").
 *
 * Retorna null se o path for vazio/nulo.
 */
export function buildImageProxyUrl(objectKey: string | null | undefined): string | null {
  if (!objectKey) return null;
  return `${apiUrl}/api/collection/collections/images/?key=${encodeURIComponent(objectKey)}`;
}
