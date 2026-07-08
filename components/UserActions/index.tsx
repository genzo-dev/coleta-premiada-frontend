"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import DefaultModal from "@/components/DefaultModal";
import {
  toggleRoleAction,
  type ToggleRoleActionState,
} from "@/actions/gestor/toggle-role-action";
import {
  toggleActiveAction,
  type ToggleActiveActionState,
} from "@/actions/gestor/deactivate-user-action";
import { ShieldPlus, Ban, CheckCircle2, Loader2 } from "lucide-react";
import type { Role } from "@/types/entities/role";

type UserActionsProps = {
  userId: number;
  userName: string;
  userAtivo: boolean;
  currentRoles: Role[];
  allRoles: Role[];
};

const initialActionState = { errors: [], success: false };

export default function UserActions({
  userId,
  userName,
  userAtivo,
  currentRoles,
  allRoles,
}: UserActionsProps) {
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [activeModalOpen, setActiveModalOpen] = useState(false);

  const [roleState, roleAction, rolePending] = useActionState<
    ToggleRoleActionState,
    FormData
  >(toggleRoleAction, initialActionState);

  const [activeState, activeAction, activePending] = useActionState<
    ToggleActiveActionState,
    FormData
  >(toggleActiveAction, initialActionState);

  const nextType = userAtivo ? "deactivate" : "activate";
  const isDeactivating = nextType === "deactivate";

  const currentRoleIds = currentRoles.map((r) => r.id);

  return (
    <>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          size="xs"
          variant="outline"
          onClick={() => setRoleModalOpen(true)}
          className="text-[#1A5538] border-[#1A5538]/30 hover:bg-[#1A5538]/5"
        >
          <ShieldPlus className="w-3 h-3!" />
          Roles
        </Button>
        <Button
          type="button"
          size="xs"
          variant="outline"
          onClick={() => setActiveModalOpen(true)}
          className={
            isDeactivating
              ? "text-red-600 border-red-200 hover:bg-red-50"
              : "text-emerald-600 border-emerald-200 hover:bg-emerald-50"
          }
        >
          {isDeactivating ? (
            <Ban className="w-3 h-3!" />
          ) : (
            <CheckCircle2 className="w-3 h-3!" />
          )}
          {isDeactivating ? "Desativar" : "Ativar"}
        </Button>
      </div>

      {roleModalOpen && (
        <DefaultModal
          onClick={() => setRoleModalOpen(false)}
          modalTitle={`Papéis — ${userName}`}
        >
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {allRoles.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                Nenhum papel cadastrado no sistema.
              </p>
            ) : (
              allRoles.map((role) => {
                const assigned = currentRoleIds.includes(role.id);
                return (
                  <form
                    key={role.id}
                    action={roleAction}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="roleId" value={role.id} />
                    <input
                      type="hidden"
                      name="type"
                      value={assigned ? "unassign" : "assign"}
                    />
                    <div>
                      <span className="text-sm font-medium">{role.nome}</span>
                      {role.descricao && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {role.descricao}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={rolePending}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                        assigned
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {rolePending ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : assigned ? (
                        "Remover"
                      ) : (
                        "Adicionar"
                      )}
                    </button>
                  </form>
                );
              })
            )}
          </div>
          {roleState.errors.length > 0 && (
            <p className="text-red-600 text-sm mt-3">{roleState.errors[0]}</p>
          )}
        </DefaultModal>
      )}

      {activeModalOpen && (
        <DefaultModal
          onClick={() => setActiveModalOpen(false)}
          modalTitle={isDeactivating ? "Desativar usuário" : "Ativar usuário"}
        >
          <p className="text-sm text-muted-foreground mb-6">
            {isDeactivating ? (
              <>
                Tem certeza que deseja desativar o usuário{" "}
                <strong>{userName}</strong>?
              </>
            ) : (
              <>
                Tem certeza que deseja ativar o usuário{" "}
                <strong>{userName}</strong>?
              </>
            )}
            <br />
            Esta ação pode ser revertida posteriormente.
          </p>
          <form action={activeAction}>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="type" value={nextType} />
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={activePending}
                onClick={() => setActiveModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={activePending}
                className={
                  isDeactivating
                    ? "bg-red-700 hover:bg-red-800 text-white"
                    : "bg-emerald-700 hover:bg-emerald-800 text-white"
                }
              >
                {activePending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isDeactivating ? (
                  "Desativar"
                ) : (
                  "Ativar"
                )}
              </Button>
            </div>
          </form>
          {activeState.errors.length > 0 && (
            <p className="text-red-600 text-sm mt-3">{activeState.errors[0]}</p>
          )}
        </DefaultModal>
      )}
    </>
  );
}
