import UpdateUserButton from "@/components/UpdateUserButton";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { User2Icon } from "lucide-react";

const perfilLabels: Record<string, string> = {
  gestor: "Gestor",
  morador: "Morador",
  supervisor: "Supervisor",
};

function formatCpf(cpf: string | null | undefined): string {
  if (!cpf) return "CPF não cadastrado";
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return cpf;
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <p className="text-muted-foreground text-sm">
        Erro ao carregar dados do usuário.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <User2Icon className="w-6 h-6 text-[#1A5538]" />
          Perfil de {currentUser.nome}
        </h1>
      </div>

      <div className="rounded-lg border border-border bg-white p-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Nome
            </dt>
            <dd className="mt-1 text-sm font-medium">{currentUser.nome}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Email
            </dt>
            <dd className="mt-1 text-sm font-medium">{currentUser.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              CPF
            </dt>
            <dd className="mt-1 text-sm font-medium">
              {formatCpf(currentUser.cpf)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Perfil
            </dt>
            <dd className="mt-1 text-sm font-medium capitalize">
              {perfilLabels[currentUser.perfil] ?? currentUser.perfil}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Status
            </dt>
            <dd className="mt-1">
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  currentUser.ativo
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {currentUser.ativo ? "Ativo" : "Inativo"}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Papéis
            </dt>
            <dd className="mt-1">
              {Array.isArray(currentUser.roles) &&
              currentUser.roles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentUser.roles.map((role) => (
                    <span
                      key={role.id}
                      className="px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700"
                    >
                      {role.nome}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Nenhum papel cadastrado
                </span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <UpdateUserButton
        user={{
          nome: currentUser.nome,
          cpf: currentUser.cpf ?? "",
        }}
      />
    </div>
  );
}
