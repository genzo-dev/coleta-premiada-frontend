"use client";

import { useState, useTransition } from "react";
import { MdBlock, MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import DefaultModal from "@/components/DefaultModal";
import ManagerUpdateUserForm from "./manager-update-user-form";
import { deactivateUserAction } from "@/actions/user/deactivate-user-action";
import type { User } from "@/schemas/user/user-schema";
import type { Cidade } from "@/types/entities/cidade";

const PERFIL_LABELS: Record<string, string> = {
  morador: "Morador",
  supervisor: "Supervisor",
  gestor: "Gestor",
  gerente_geral: "Gerente Geral",
};

type UsuariosTableProps = {
  users: User[];
  cidades: Cidade[];
  currentUserId?: number;
  hideGerenteGeral?: boolean;
};

export default function UsuariosTable({
  users,
  cidades,
  currentUserId,
  hideGerenteGeral,
}: UsuariosTableProps) {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deactivatingId, setDeactivatingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDeactivate(user: User) {
    if (!window.confirm(`Deseja realmente desativar "${user.nome}"?`)) return;

    setError(null);
    setDeactivatingId(user.id);
    startTransition(async () => {
      const result = await deactivateUserAction(user.id);
      if (!result.success) {
        setError(result.errors?.[0] ?? "Não foi possível desativar o usuário");
      }
      setDeactivatingId(null);
    });
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">CPF</th>
              <th className="px-4 py-3">Perfil</th>
              <th className="px-4 py-3">Cidade</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  {user.nome}
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-gray-600">{user.cpf || "-"}</td>
                <td className="px-4 py-3">
                  {PERFIL_LABELS[user.perfil] ?? user.perfil}
                </td>
                <td className="px-4 py-3">
                  {user.cidade ? `${user.cidade.nome}/${user.cidade.uf}` : "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      user.ativo
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setEditingUser(user)}
                      title="Editar"
                    >
                      <MdEdit className="w-4! h-4!" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="text-red-600 hover:text-red-700"
                      disabled={
                        user.id === currentUserId ||
                        (isPending && deactivatingId === user.id)
                      }
                      onClick={() => handleDeactivate(user)}
                      title="Desativar"
                    >
                      <MdBlock className="w-4! h-4!" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {editingUser && (
        <DefaultModal
          modalTitle="Editar usuário"
          onClick={() => setEditingUser(null)}
        >
          <ManagerUpdateUserForm
            user={editingUser}
            cidades={cidades}
            hideGerenteGeral={hideGerenteGeral}
          />
        </DefaultModal>
      )}
    </>
  );
}
