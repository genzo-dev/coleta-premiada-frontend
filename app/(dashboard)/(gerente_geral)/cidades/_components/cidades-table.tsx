"use client";

import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import DefaultModal from "@/components/DefaultModal";
import UpdateCidadeForm from "./update-cidade-form";
import type { Cidade } from "@/types/entities/cidade";

type CidadesTableProps = {
  cidades: Cidade[];
};

export default function CidadesTable({ cidades }: CidadesTableProps) {
  const [editingCidade, setEditingCidade] = useState<Cidade | null>(null);

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">UF</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {cidades.map((cidade, index) => (
              <tr
                key={cidade.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  {cidade.nome}
                </td>
                <td className="px-4 py-3 text-gray-600">{cidade.uf}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      cidade.ativo
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {cidade.ativo ? "Ativa" : "Inativa"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setEditingCidade(cidade)}
                    title="Editar"
                  >
                    <MdEdit className="w-4! h-4!" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCidade && (
        <DefaultModal
          modalTitle="Editar cidade"
          onClick={() => setEditingCidade(null)}
        >
          <UpdateCidadeForm cidade={editingCidade} />
        </DefaultModal>
      )}
    </>
  );
}
