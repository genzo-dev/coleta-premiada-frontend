import UpdateUserButton from "@/components/UpdateUserButton";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { User2Icon } from "lucide-react";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <User2Icon className="w-6 h-6 text-[#1A5538]" />
          Perfil de {currentUser?.nome}
        </h1>
      </div>
      <div>
        <h2>Meus dados</h2>
        <p>{currentUser?.nome}</p>
        <p>{currentUser?.perfil}</p>
        <p>{currentUser?.email}</p>
        <p>{currentUser?.perfil}</p>
        <p>{currentUser?.cpf || "CPF não cadastrado"}</p>
        {Array.isArray(currentUser?.roles) && currentUser.roles.length > 0 ? (
          currentUser.roles.map((item) => <div key={item.id}>{item.nome}</div>)
        ) : (
          <p>Não tem papéis cadastrados no sistema</p>
        )}
      </div>
      <UpdateUserButton
        user={{
          nome: currentUser?.nome ?? "",
          cpf: currentUser?.cpf ?? "",
        }}
      />
    </div>
  );
}
