"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MdDownload } from "react-icons/md";

export default function ExportCsvButton() {
  const searchParams = useSearchParams();

  function buildExportUrl() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const qs = params.toString();
    return `/api/auditoria/export${qs ? `?${qs}` : ""}`;
  }

  return (
    <Button variant="outline" asChild>
      <a href={buildExportUrl()} download>
        <MdDownload className="h-4 w-4" />
        Exportar CSV
      </a>
    </Button>
  );
}
