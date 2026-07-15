import Link from "next/link";
import { HiUserGroup } from "react-icons/hi";
import { FaClipboardList } from "react-icons/fa";
import { getUsers } from "@/lib/gestor/get-users";
import { getRoles } from "@/lib/gestor/get-roles";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import UserActions from "@/components/UserActions";
import CreateUserButton from "@/components/CreateUserButton";
import { Button } from "@/components/ui/button";
import { IoNewspaperOutline } from "react-icons/io5";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuários",
};

const perfilLabels: Record<string, string> = {
  gestor: "Gestor",
  morador: "Morador",
  supervisor: "Supervisor",
};

const perfilColors: Record<string, string> = {
  gestor: "bg-emerald-100 text-emerald-700",
  morador: "bg-blue-100 text-blue-700",
  supervisor: "bg-purple-100 text-purple-700",
};

function formatCpf(cpf: string | null | undefined): string {
  if (!cpf) return "—";
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return cpf;
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const PAGE_SIZE = 12;

export default async function UsuariosPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const perfil = searchParams.perfil || "";
  const ativo = searchParams.ativo || "";
  const search = searchParams.search || "";

  const [data, allRoles, currentUser] = await Promise.all([
    getUsers({
      page,
      page_size: PAGE_SIZE,
      ...(perfil && { perfil }),
      ...(ativo && { ativo }),
      ...(search && { search }),
    }),
    getRoles(),
    getCurrentUser(),
  ]);

  const users = data?.results ?? [];
  const count = data?.count ?? 0;
  const roles = allRoles ?? [];
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const buildPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (perfil) params.set("perfil", perfil);
    if (ativo) params.set("ativo", ativo);
    if (pageNum > 1) params.set("page", String(pageNum));
    const qs = params.toString();
    return `/usuarios${qs ? `?${qs}` : ""}`;
  };

  const hasFilters = !!(perfil || ativo || search);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <HiUserGroup className="w-6 h-6 text-[#1A5538]" />
          Usuários
        </h1>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-center gap-6 justify-between">
        <div>
          <form method="GET" className="flex flex-col xl:flex-row gap-3">
            <input
              name="search"
              defaultValue={search}
              placeholder="Buscar por nome ou email..."
              className="h-9 w-full xl:w-64 rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <select
              name="perfil"
              defaultValue={perfil}
              className="h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="">Todos os perfis</option>
              <option value="gestor">Gestor</option>
              <option value="morador">Morador</option>
              <option value="supervisor">Supervisor</option>
            </select>
            <select
              name="ativo"
              defaultValue={ativo}
              className="h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="">Todos os status</option>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
            <button
              type="submit"
              className="h-9 px-4 rounded-lg text-sm font-medium bg-[#116F51] text-white hover:bg-emerald-800 transition cursor-pointer"
            >
              Filtrar
            </button>
            {hasFilters && (
              <a
                href="/usuarios"
                className="h-9 px-4 rounded-lg text-sm font-medium border border-border bg-white text-muted-foreground hover:bg-gray-50 transition flex items-center"
              >
                Limpar
              </a>
            )}
          </form>
        </div>

        <div className="flex items-center gap-4">
          <CreateUserButton cidadeId={currentUser?.cidade?.id} />
          <Link href="/usuarios/roles">
            <Button className="bg-green-700 hover:bg-green-800 transition">
              <IoNewspaperOutline /> Gerenciar papéis
            </Button>
          </Link>
        </div>
      </div>

      {users.length > 0 ? (
        <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">CPF</th>
                <th className="px-4 py-3">Perfil</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Papéis</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {user.nome}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {formatCpf(user.cpf)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        perfilColors[user.perfil] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {perfilLabels[user.perfil] ?? user.perfil}
                    </span>
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
                    {user.roles.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <span
                            key={role.id}
                            className="px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700"
                          >
                            {role.nome}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <UserActions
                      userId={user.id}
                      userName={user.nome}
                      userAtivo={user.ativo}
                      currentRoles={user.roles}
                      allRoles={roles}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            <FaClipboardList /> Nenhum usuário encontrado
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="text-muted-foreground">
            Mostrando {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, count)} de {count} usuários
          </p>
          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link
                href={buildPageUrl(page - 1)}
                className="px-3 py-1.5 rounded-md border border-border text-sm font-medium hover:bg-gray-50 transition"
              >
                Anterior
              </Link>
            ) : (
              <span className="px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground cursor-not-allowed">
                Anterior
              </span>
            )}
            {page < totalPages ? (
              <Link
                href={buildPageUrl(page + 1)}
                className="px-3 py-1.5 rounded-md border border-border text-sm font-medium hover:bg-gray-50 transition"
              >
                Próximo
              </Link>
            ) : (
              <span className="px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground cursor-not-allowed">
                Próximo
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
