import { MdPeople } from "react-icons/md";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getUsers } from "@/lib/users/get-users";
import { getCidades } from "@/lib/cidades/get-cidades";
import Pagination from "@/components/Pagination";
import NewUserButton from "./_components/new-user-button";
import UsuariosFilters from "./_components/usuarios-filters";
import UsuariosTable from "./_components/usuarios-table";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function UsuariosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const perfil = firstParam(params.perfil);
  const ativo = firstParam(params.ativo);
  const search = firstParam(params.search);
  const page = firstParam(params.page);

  const [currentUser, usersData, cidades] = await Promise.all([
    getCurrentUser(),
    getUsers({ perfil, ativo, search, page }),
    getCidades(),
  ]);

  const users = usersData?.results ?? [];
  const hideGerenteGeral = currentUser?.perfil === "gestor";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdPeople className="w-6 h-6 text-[#116F51]" />
          Usuários
        </h1>

        <NewUserButton cidades={cidades ?? []} hideGerenteGeral={hideGerenteGeral} />
      </div>

      <UsuariosFilters />

      {users.length > 0 ? (
        <>
          <UsuariosTable
            users={users}
            cidades={cidades ?? []}
            currentUserId={currentUser?.id}
            hideGerenteGeral={hideGerenteGeral}
          />
          <Pagination count={usersData?.count ?? 0} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            Nenhum usuário encontrado
          </p>
        </div>
      )}
    </div>
  );
}
