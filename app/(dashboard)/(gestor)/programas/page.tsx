import CreateProgramForm from "@/components/CreateProgramForm";
import { getPrograms } from "@/lib/programs/get-programs";

export default async function ProgramasPage() {
  const programs = await getPrograms();

  return (
    <div>
      Programas do Gestor
      <div>
        <CreateProgramForm />
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
