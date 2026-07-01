import { materials } from "@/mocks/materials";
import TitleSection from "../TitleSection";

export default function MaterialsSection() {
  const PROGRAM_CONSTANT = 1.5;
  const TOTAL_KG = materials.reduce((acc, item) => {
    return acc + item.weight;
  }, 0);
  const FINAL_SCORE = (TOTAL_KG * PROGRAM_CONSTANT).toFixed(2);

  return (
    <div>
      <div>
        <TitleSection
          className="text-3xl font-bold mb-2"
          title="Exemplificação Prática do Programa"
        />

        <p>
          Os materiais abaixo servem somente para exemplificar como o programa
          funciona, lembrando que a pontuação é gerada a partir do peso/kg
          total.
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-6 md:flex-row">
        <div className="flex-1">
          <ul className="flex flex-col gap-2">
            {materials.map((item) => (
              <li
                key={item.material}
                className="flex items-center justify-between py-2 px-2 border border-gray-300 rounded-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${item.color}`} />
                  {item.material}
                </div>
                <div>{item.weight}kg</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col flex-1 px-4 py-4 border border-gray-200 rounded-xl shadow-sm bg-white">
          <div className="mb-4">
            <h3 className="font-semibold text-lg md:text-xl">
              Cálculo da pontuação
            </h3>
            <div className="bg-gray-200 h-px w-full mt-2" />
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Peso total</span>
              <span className="font-medium">{TOTAL_KG} kg</span>
            </div>

            <div className="flex justify-between">
              <span>Constante</span>
              <span className="font-medium">{PROGRAM_CONSTANT}</span>
            </div>
          </div>

          <div className="bg-gray-200 h-px w-full my-4" />

          <div className="flex justify-between my-auto">
            <span className="text-sm md:text-xl text-gray-600">Total</span>
            <span className="text-xl font-bold text-green-600">
              {FINAL_SCORE} pts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
