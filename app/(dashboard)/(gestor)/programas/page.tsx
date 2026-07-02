import NewProgramButton from "@/components/NewProgramButton";
import { getPrograms } from "@/lib/programs/get-programs";

export default async function ProgramasPage() {
  const programs = await getPrograms();

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl md:text-5xl font-bold border-b-2 border-gray-300 pb-2 md:pb-4">
        Programas do Gestor
      </h1>
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl">Programas</h2>

        <NewProgramButton />
      </div>
      {programs && programs?.length > 0 ? (
        programs.map((program) => (
          <div key={program.id}>
            <h2>{program.nome}</h2>
            <p>{program.descricao}</p>
            <p>
              Data de Início:{" "}
              {new Date(program.data_inicio).toLocaleDateString()}
            </p>
            <p>
              Data de Fim: {new Date(program.data_fim).toLocaleDateString()}
            </p>
            <p>Ativo: {program.ativo ? "Sim" : "Não"}</p>
            <p>Desconto Máximo: {program.desconto_maximo}</p>
            <h3>Regras:</h3>
            <ul>
              <li>Pontos por Real: {program.regras?.pontos_por_real ?? "-"}</li>
              <li>
                Mínimo para Benefício:{" "}
                {program.regras?.minimo_para_beneficio ?? "-"}
              </li>
              <li>
                Permite Acúmulo de Ciclos:{" "}
                {program.regras?.permite_acumulo_ciclos ? "Sim" : "Não"}
              </li>
            </ul>
          </div>
        ))
      ) : (
        <p>Nenhum programa encontrado</p>
      )}
    </div>
  );
}
