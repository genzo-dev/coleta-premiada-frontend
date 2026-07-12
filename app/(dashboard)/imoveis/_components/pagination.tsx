"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between border-t border-border pt-4">
      <span className="text-xs text-muted-foreground">
        Página {currentPage} de {totalPages || 1}
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
