"use client";

import { cn } from "@/lib/utils";

type ColetasPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ColetasPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ColetasPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visiblePages = pages.filter(
    (p) =>
      p === 1 ||
      p === totalPages ||
      (p >= currentPage - 2 && p <= currentPage + 2),
  );

  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-1">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm transition-colors",
          currentPage === 1
            ? "text-muted-foreground cursor-not-allowed"
            : "hover:bg-muted text-foreground",
        )}
      >
        ‹ Anterior
      </button>

      {visiblePages.map((p, idx) => {
        const prev = visiblePages[idx - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1">
            {showEllipsis && (
              <span className="px-2 text-muted-foreground text-sm">…</span>
            )}
            <button
              type="button"
              disabled={p === currentPage}
              onClick={() => onPageChange(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={cn(
                "min-w-8 px-3 py-1.5 rounded-md text-sm text-center transition-colors",
                p === currentPage
                  ? "bg-[#116F51] text-white cursor-default"
                  : "hover:bg-muted text-foreground",
              )}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm transition-colors",
          currentPage === totalPages
            ? "text-muted-foreground cursor-not-allowed"
            : "hover:bg-muted text-foreground",
        )}
      >
        Próxima ›
      </button>
    </nav>
  );
}
