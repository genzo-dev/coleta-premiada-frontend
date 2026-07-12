"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Cidade } from "@/types/entities/cidade";
import type { Fonte } from "@/actions/auditoria/get-auditoria-data-action";

const selectClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const TABELAS = [
  { value: "accounts_usuario", label: "Usuários" },
  { value: "accounts_role", label: "Papéis (Roles)" },
  { value: "accounts_cidade", label: "Cidades" },
  { value: "program_imovel", label: "Imóveis" },
  { value: "program_programa", label: "Programas" },
  { value: "program_regraprograma", label: "Regras de Programa" },
  { value: "program_ciclo", label: "Ciclos" },
  { value: "program_saldopontos", label: "Benefícios (Saldo de Pontos)" },
  { value: "program_consolidacao", label: "Consolidações" },
  { value: "program_constantepontuacao", label: "Constante de Pontuação" },
  { value: "collection_registrocoleta", label: "Coletas" },
  { value: "collection_evidencia", label: "Evidências" },
  { value: "collection_contestacao", label: "Contestações" },
];

export default function AuditoriaFilters({ cidades }: { cidades?: Cidade[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fonte = (searchParams.get("fonte") ?? "core") as Fonte;

  const [usuarioId, setUsuarioId] = useState(
    searchParams.get("usuario_id") ?? "",
  );
  const [objetoId, setObjetoId] = useState(searchParams.get("objeto_id") ?? "");
  const [coletorId, setColetorId] = useState(
    searchParams.get("coletor_id") ?? "",
  );
  const [evento, setEvento] = useState(searchParams.get("evento") ?? "");
  const [dataInicio, setDataInicio] = useState(
    searchParams.get("data_inicio") ?? "",
  );
  const [dataFim, setDataFim] = useState(searchParams.get("data_fim") ?? "");

  function updateParams(entries: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(entries)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete("page");
    window.history.pushState(null, "", `${pathname}?${params.toString()}`);
  }

  function switchFonte(novaFonte: Fonte) {
    window.history.pushState(null, "", `${pathname}?fonte=${novaFonte}`);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toggle de fonte */}
      <div className="flex gap-1 rounded-lg border border-border p-1 w-fit">
        <button
          type="button"
          onClick={() => switchFonte("core")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            fonte === "core"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sistema
        </button>
        <button
          type="button"
          onClick={() => switchFonte("ms")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            fonte === "ms"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Coletas (MS)
        </button>
      </div>

      {/* Filtros por fonte */}
      {fonte === "core" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateParams({
              usuario_id: usuarioId,
              objeto_id: objetoId,
              data_inicio: dataInicio,
              data_fim: dataFim,
            });
          }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center"
        >
          <Input
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            placeholder="ID do usuário..."
            className="sm:max-w-36"
          />

          <select
            className={`${selectClassName} sm:max-w-52`}
            defaultValue={searchParams.get("tabela") ?? ""}
            onChange={(e) => updateParams({ tabela: e.target.value })}
          >
            <option value="">Todas as tabelas</option>
            {TABELAS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <select
            className={`${selectClassName} sm:max-w-36`}
            defaultValue={searchParams.get("operacao") ?? ""}
            onChange={(e) => updateParams({ operacao: e.target.value })}
          >
            <option value="">Todas as operações</option>
            <option value="INSERT">Criação</option>
            <option value="UPDATE">Alteração</option>
            <option value="DELETE">Exclusão</option>
            <option value="SELECT">Consulta</option>
          </select>

          {cidades && (
            <select
              className={`${selectClassName} sm:max-w-44`}
              defaultValue={searchParams.get("cidade") ?? ""}
              onChange={(e) => updateParams({ cidade: e.target.value })}
            >
              <option value="">Todas as cidades</option>
              {cidades.map((c) => (
                <option key={c.id} value={c.nome}>
                  {c.nome}
                </option>
              ))}
            </select>
          )}

          <Input
            value={objetoId}
            onChange={(e) => setObjetoId(e.target.value)}
            placeholder="ID do registro..."
            className="sm:max-w-32"
          />

          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="sm:max-w-44"
            />
            <span className="text-sm text-muted-foreground">até</span>
            <Input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="sm:max-w-44"
            />
          </div>

          <Button type="submit" variant="outline" className="sm:w-fit">
            Buscar
          </Button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateParams({
              coletor_id: coletorId,
              evento,
              data_inicio: dataInicio,
              data_fim: dataFim,
            });
          }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center"
        >
          <Input
            value={coletorId}
            onChange={(e) => setColetorId(e.target.value)}
            placeholder="ID do coletor..."
            className="sm:max-w-36"
          />

          <select
            className={`${selectClassName} sm:max-w-36`}
            defaultValue={searchParams.get("nivel") ?? ""}
            onChange={(e) => updateParams({ nivel: e.target.value })}
          >
            <option value="">Todos os níveis</option>
            <option value="info">Info</option>
            <option value="warning">Atenção</option>
            <option value="error">Erro</option>
          </select>

          <Input
            value={evento}
            onChange={(e) => setEvento(e.target.value)}
            placeholder="Nome do evento..."
            className="sm:max-w-44"
          />

          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="sm:max-w-44"
            />
            <span className="text-sm text-muted-foreground">até</span>
            <Input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="sm:max-w-44"
            />
          </div>

          <Button type="submit" variant="outline" className="sm:w-fit">
            Buscar
          </Button>
        </form>
      )}
    </div>
  );
}
