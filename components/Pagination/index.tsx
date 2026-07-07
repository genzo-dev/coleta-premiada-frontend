"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  count: number;
  pageSize?: number;
};

// Paginação server-driven baseada em searchParams (?page=N), reaproveitada pelas
// listagens paginadas pelo DRF (usuários, imóveis, coletas, benefícios, relatórios).
export default function Pagination({ count, pageSize = 20 }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const currentPage = Math.min(
    Math.max(1, Number(searchParams.get("page") || "1")),
    totalPages,
  );

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between gap-4 pt-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Anterior
      </Button>

      <span className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Próxima
      </Button>
    </div>
  );
}
