"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { exportAuditCsvAction } from "@/actions/audit/export-audit-csv-action";
import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa";

type Filters = {
  usuario_id: string;
  tabela: string;
  operacao: string;
  data_inicio: string;
  data_fim: string;
  objeto_id: string;
};

export function AuditFilters({ searchParams }: { searchParams: Filters }) {
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const addParam = (key: string) => {
      const val = formData.get(key) as string;
      if (val) params.set(key, val);
    };

    addParam("usuario_id");
    addParam("tabela");
    addParam("operacao");
    addParam("data_inicio");
    addParam("data_fim");
    addParam("objeto_id");

    router.push(`?${params.toString()}`);
  };

  const handleExport = async () => {
    setIsExporting(true);
    const params = new URLSearchParams();
    if (searchParams.usuario_id) params.set("usuario_id", searchParams.usuario_id);
    if (searchParams.tabela) params.set("tabela", searchParams.tabela);
    if (searchParams.operacao) params.set("operacao", searchParams.operacao);
    if (searchParams.data_inicio) params.set("data_inicio", searchParams.data_inicio);
    if (searchParams.data_fim) params.set("data_fim", searchParams.data_fim);
    if (searchParams.objeto_id) params.set("objeto_id", searchParams.objeto_id);

    try {
      const res = await exportAuditCsvAction(params.toString());
      if (res.success && res.data) {
        const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit_logs_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert("Erro ao exportar CSV.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao exportar CSV.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1 w-full sm:w-auto flex-1 min-w-[150px]">
          <label className="text-xs font-medium text-gray-500">ID Usuário</label>
          <input
            name="usuario_id"
            defaultValue={searchParams.usuario_id}
            placeholder="Ex: 12"
            className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
          />
        </div>
        
        <div className="flex flex-col gap-1 w-full sm:w-auto flex-1 min-w-[150px]">
          <label className="text-xs font-medium text-gray-500">Tabela</label>
          <select
            name="tabela"
            defaultValue={searchParams.tabela}
            className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
          >
            <option value="">Todas as Tabelas</option>
            <option value="RegistroColeta">RegistroColeta</option>
            <option value="Contestacao">Contestacao</option>
            <option value="Usuario">Usuario</option>
            <option value="Imovel">Imovel</option>
            <option value="Programa">Programa</option>
            <option value="Ciclo">Ciclo</option>
            <option value="RegraPrograma">RegraPrograma</option>
            <option value="ConstantePontuacao">ConstantePontuacao</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full sm:w-auto flex-1 min-w-[150px]">
          <label className="text-xs font-medium text-gray-500">Operação</label>
          <select
            name="operacao"
            defaultValue={searchParams.operacao}
            className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
          >
            <option value="">Todas</option>
            <option value="INSERT">INSERT</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="SELECT">SELECT</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full sm:w-auto flex-1 min-w-[150px]">
          <label className="text-xs font-medium text-gray-500">Data Início</label>
          <input
            type="date"
            name="data_inicio"
            defaultValue={searchParams.data_inicio}
            className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
          />
        </div>

        <div className="flex flex-col gap-1 w-full sm:w-auto flex-1 min-w-[150px]">
          <label className="text-xs font-medium text-gray-500">Data Fim</label>
          <input
            type="date"
            name="data_fim"
            defaultValue={searchParams.data_fim}
            className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
          />
        </div>

        <div className="flex flex-col gap-1 w-full sm:w-auto flex-1 min-w-[150px]">
          <label className="text-xs font-medium text-gray-500">Objeto ID</label>
          <input
            name="objeto_id"
            defaultValue={searchParams.objeto_id}
            placeholder="Ex: 5"
            className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
          />
        </div>

        <button
          type="submit"
          className="h-9 px-4 rounded-md text-sm font-medium bg-[#116F51] text-white hover:bg-emerald-800 transition"
        >
          Filtrar
        </button>
      </form>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleExport}
          disabled={isExporting}
          variant="outline"
          className="flex items-center gap-2 border-green-700 text-green-800 hover:bg-green-50"
        >
          <FaDownload /> {isExporting ? "Gerando..." : "Exportar CSV"}
        </Button>
      </div>
    </div>
  );
}
