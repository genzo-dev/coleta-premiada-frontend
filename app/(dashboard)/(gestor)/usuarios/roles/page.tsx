import { ShieldCheck } from "lucide-react";
import { FaArrowLeft, FaClipboardList } from "react-icons/fa";
import { getRoles } from "@/lib/gestor/get-roles";
import ModalTriggerButton from "@/components/ModalTriggerButton";
import CreateRoleForm from "@/components/CreateRoleForm";
import UpdateRoleForm from "@/components/UpdateRoleForm";
import Link from "next/link";

export default async function RolesPage() {
  const roles = await getRoles();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/usuarios"
            className="text-muted-foreground hover:text-foreground transition"
          >
            <FaArrowLeft className="w-5 h-5" />
          </Link>

          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#1A5538]" />
            Papéis
          </h1>
        </div>

        <ModalTriggerButton label="Novo papel" modalTitle="Criar papel">
          <CreateRoleForm />
        </ModalTriggerButton>
      </div>

      {roles && roles.length > 0 ? (
        <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {roles.map((role, index) => (
                <tr
                  key={role.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {role.nome}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-60 truncate">
                    {role.descricao || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        role.ativo
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {role.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <ModalTriggerButton
                      label="Editar"
                      modalTitle={`Editar — ${role.nome}`}
                    >
                      <UpdateRoleForm role={role} />
                    </ModalTriggerButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            <FaClipboardList /> Nenhum papel encontrado
          </p>
        </div>
      )}
    </div>
  );
}
