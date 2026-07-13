import Navbar from "@/components/HomePage/Navbar";
import Link from "next/link";

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Política de Privacidade <span className="text-green-600">—</span>{" "}
            Coleta Premiada
          </h1>

          <p className="text-gray-500 text-sm mb-10">
            Última atualização: Julho de 2026
          </p>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              1. Quem somos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              O Coleta Premiada é um programa que incentiva a reciclagem dando
              desconto no IPTU para moradores que separam materiais recicláveis.
              A plataforma é operada em parceria com a prefeitura de cada cidade
              participante.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Esta Política de Privacidade explica de forma simples e
              transparente como tratamos os seus dados pessoais, em conformidade
              com a Lei Geral de Proteção de Dados (LGPD) .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              2. Quais dados coletamos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Coletamos apenas os dados necessários para você participar do
              programa e receber os benefícios.
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Dados que você informa
            </h3>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                <strong>Nome completo e CPF</strong> — para identificar você
                como participante
              </li>
              <li>
                <strong>E-mail</strong> — para criar sua conta, confirmar seu
                cadastro e enviar comunicados importantes
              </li>
              <li>
                <strong>Endereço do imóvel</strong> (CEP, rua, número, bairro) —
                para vincular sua residência ao programa de coleta
              </li>
              <li>
                <strong>Número de moradores</strong> — para indicadores do
                programa
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Dados gerados durante o uso
            </h3>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                Peso dos materiais recicláveis coletados e a pontuação gerada
              </li>
              <li>
                Fotos dos materiais registradas como comprovante da coleta
              </li>
              <li>
                Localização geográfica do imóvel (latitude e longitude) — para
                definir as rotas de coleta
              </li>
              <li>
                Endereço IP e data/hora de cada acesso — para segurança e
                auditoria do sistema
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Dados de login com Google
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Se você optar por entrar com sua conta Google, recebemos seu nome
              e e-mail diretamente do Google. Você ainda precisará informar seu
              CPF e sobrenome para completar o cadastro.
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Dados dos agentes de coleta
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Para os coletores que trabalham em campo, também coletamos: nome,
              matrícula, e-mail, foto de perfil e zona de trabalho.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              3. Para que usamos seus dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Usamos seus dados apenas para as finalidades necessárias ao
              funcionamento do programa:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">
                      Finalidade
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">
                      Por que é necessário
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      finalidade: "Criar e manter sua conta",
                      motivo:
                        "Para você acessar a plataforma e acompanhar suas coletas",
                    },
                    {
                      finalidade: "Vincular seu imóvel ao programa",
                      motivo:
                        "Para sua residência entrar na rota de coleta seletiva",
                    },
                    {
                      finalidade: "Registrar as coletas e calcular pontos",
                      motivo: "Para você acumular benefícios",
                    },
                    {
                      finalidade: "Converter pontos em desconto no IPTU",
                      motivo:
                        "Para a prefeitura aplicar o desconto na sua conta",
                    },
                    {
                      finalidade: "Enviar e-mails de confirmação e avisos",
                      motivo: "Para manter você informado sobre o programa",
                    },
                    {
                      finalidade: "Analisar contestações sobre coletas",
                      motivo: "Para garantir que os registros estão corretos",
                    },
                    {
                      finalidade: "Gerar relatórios para a prefeitura",
                      motivo: "Para acompanhar o desempenho do programa",
                    },
                    {
                      finalidade: "Garantir a segurança do sistema",
                      motivo:
                        "Para proteger seus dados contra acessos não autorizados",
                    },
                  ].map((row) => (
                    <tr
                      key={row.finalidade}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">
                        {row.finalidade}
                      </td>
                      <td className="px-4 py-2">{row.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              4. Com quem compartilhamos seus dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Para o programa funcionar, precisamos compartilhar alguns dados
              com parceiros específicos. Todos eles são obrigados a proteger
              suas informações e usar apenas para a finalidade descrita:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">
                      Parceiro
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">
                      O que compartilhamos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      parceiro: "Prefeitura do seu município",
                      dados: "Pontuação acumulada e desconto gerado",
                    },
                    {
                      parceiro: "Aplicativo do coletor",
                      dados: "Nome do morador e endereço do imóvel",
                    },
                    {
                      parceiro: "Google (login social)",
                      dados: "Nome e e-mail (com sua autorização)",
                    },
                    {
                      parceiro: "OpenStreetMap",
                      dados: "Endereço completo do imóvel",
                    },
                    {
                      parceiro: "Serviço de e-mail",
                      dados: "Seu e-mail",
                    },
                    {
                      parceiro: "DeepSeek (IA para relatórios)",
                      dados:
                        "Apenas números do programa (total de coletas, peso total) — sem seus dados pessoais",
                    },
                    {
                      parceiro: "Armazenamento de fotos (MinIO)",
                      dados: "Fotos das coletas",
                    },
                  ].map((row) => (
                    <tr
                      key={row.parceiro}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{row.parceiro}</td>
                      <td className="px-4 py-2">{row.dados}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed font-medium">
              O Coleta Premiada não vende seus dados pessoais para ninguém.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              5. Transferência internacional de dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Alguns serviços que utilizamos estão localizados fora do Brasil.
              Isso significa que seus dados podem ser transferidos para outros
              países, sempre com as devidas proteções exigidas pela LGPD:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">
                      Serviço
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">País</th>
                    <th className="text-left px-4 py-2 font-semibold">
                      Dados transferidos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      servico: "Google (OAuth2)",
                      pais: "Estados Unidos",
                      dados: "Nome e e-mail (quando você usa login do Google)",
                    },
                    {
                      servico: "OpenStreetMap (Nominatim)",
                      pais: "Alemanha",
                      dados: "Endereço do imóvel (para localização no mapa)",
                    },
                    {
                      servico: "DeepSeek",
                      pais: "China",
                      dados:
                        "Nenhum dado pessoal — apenas números gerais do programa",
                    },
                  ].map((row) => (
                    <tr
                      key={row.servico}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{row.servico}</td>
                      <td className="px-4 py-2">{row.pais}</td>
                      <td className="px-4 py-2">{row.dados}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Nestes casos, adotamos medidas contratuais e de segurança para
              garantir que seus dados continuem protegidos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              6. Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Usamos cookies apenas para manter sua sessão ativa e proteger sua
              conta:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">
                      Cookie
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">
                      Para que serve
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      cookie: "Token de acesso",
                      finalidade: "Manter você logado na plataforma",
                    },
                    {
                      cookie: "Token de renovação",
                      finalidade: "Renovar sua sessão automaticamente",
                    },
                    {
                      cookie: "Token de segurança (CSRF)",
                      finalidade: "Proteger contra ataques",
                    },
                  ].map((row) => (
                    <tr
                      key={row.cookie}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{row.cookie}</td>
                      <td className="px-4 py-2">{row.finalidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              Não usamos cookies de rastreamento, redes sociais ou publicidade.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Ao acessar a plataforma, você verá um aviso explicando o uso
              desses cookies essenciais.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              7. Como protegemos seus dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Adotamos diversas medidas para manter suas informações seguras:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                <strong>Senha protegida:</strong> Sua senha é armazenada de
                forma criptografada — nem mesmo a equipe do sistema consegue
                vê-la
              </li>
              <li>
                <strong>Confirmação de e-mail:</strong> Você precisa confirmar
                seu e-mail para usar a plataforma
              </li>
              <li>
                <strong>Controle de acesso:</strong> Cada tipo de usuário
                (morador, gestor, coletor) só enxerga os dados necessários para
                sua função
              </li>
              <li>
                <strong>Registro de auditoria:</strong> Toda alteração feita no
                sistema fica registrada com data, horário e quem fez
              </li>
              <li>
                <strong>Isolamento por cidade:</strong> Gestores de uma cidade
                não acessam dados de outra cidade
              </li>
              <li>
                <strong>Backups regulares:</strong> Seus dados são copiados
                periodicamente para evitar perdas
              </li>
              <li>
                <strong>Desativação da conta:</strong> Quando uma conta é
                desativada, os dados são preservados apenas para cumprimento de
                obrigações legais
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              8. Por quanto tempo guardamos seus dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mantemos seus dados apenas pelo tempo necessário:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">
                      Tipo de dado
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">
                      Prazo de guarda
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">
                      Dados do seu cadastro e coletas
                    </td>
                    <td className="px-4 py-2">
                      Enquanto sua conta estiver ativa + 5 anos após o
                      encerramento
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">
                      Registros de auditoria
                    </td>
                    <td className="px-4 py-2">5 anos</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">Fotos das coletas</td>
                    <td className="px-4 py-2">90 dias</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">Cookies de sessão</td>
                    <td className="px-4 py-2">30 dias ou até o logout</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Após esses prazos, os dados são eliminados ou anonimizados
              (transformados em estatísticas que não identificam você).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              9. Seus direitos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A LGPD garante a você diversos direitos sobre seus dados pessoais.
              Você pode solicitar a qualquer momento:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">
                      Direito
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">
                      O que significa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      direito: "Saber quais dados temos",
                      significado:
                        "Pedir uma cópia de todos os seus dados armazenados",
                    },
                    {
                      direito: "Corrigir seus dados",
                      significado: "Atualizar nome, e-mail, endereço ou CPF",
                    },
                    {
                      direito: "Excluir seus dados",
                      significado:
                        "Pedir a remoção dos seus dados (quando a lei permitir)",
                    },
                    {
                      direito: "Saber com quem compartilhamos",
                      significado:
                        "Receber a lista completa de parceiros que acessam seus dados",
                    },
                    {
                      direito: "Revogar autorização",
                      significado:
                        "Cancelar o uso de seus dados para alguma finalidade específica",
                    },
                    {
                      direito: "Portar seus dados",
                      significado:
                        "Solicitar a transferência dos seus dados para outro serviço",
                    },
                  ].map((row) => (
                    <tr
                      key={row.direito}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{row.direito}</td>
                      <td className="px-4 py-2">{row.significado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Para exercer qualquer um desses direitos, basta enviar um e-mail
              para{" "}
              <Link
                href="mailto:contato@coletapremiada.gov.br"
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                coletapremiada@gmail.com.br
              </Link>{" "}
              informando seu nome, CPF e o que deseja. Responderemos em até 15
              dias úteis.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              10. Alterações nesta política
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Podemos atualizar esta Política de Privacidade sempre que
              necessário. Quando houver mudanças importantes, avisaremos por
              e-mail ou por um comunicado na plataforma.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Recomendamos que você consulte esta página de tempos em tempos
              para se manter informado.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              11. Fale conosco
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Se você tiver dúvidas, quiser exercer seus direitos ou precisar de
              ajuda com relação aos seus dados, entre em contato:
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>E-mail:</strong>{" "}
              <Link
                href="mailto:contato@coletapremiada.gov.br"
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                coletapremiada@gmail.com.br
              </Link>
            </p>
            <p className="text-gray-600 leading-relaxed">
              Você também pode registrar uma reclamação na Autoridade Nacional
              de Proteção de Dados (ANPD), órgão responsável por fiscalizar a
              aplicação da LGPD no Brasil.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              12. Glossário
            </h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">Termo</th>
                    <th className="text-left px-4 py-2 font-semibold">
                      O que significa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      termo: "Dados pessoais",
                      significado:
                        "Qualquer informação que identifique você (nome, CPF, e-mail, endereço)",
                    },
                    {
                      termo: "Tratamento",
                      significado:
                        "Toda ação feita com seus dados (coletar, guardar, usar, compartilhar, excluir)",
                    },
                    {
                      termo: "LGPD",
                      significado:
                        "Lei brasileira que protege seus dados pessoais (Lei nº 13.709/2018)",
                    },
                    {
                      termo: "Cookies",
                      significado:
                        "Pequenos arquivos salvos no seu navegador para manter a sessão ativa",
                    },
                    {
                      termo: "Anonimização",
                      significado:
                        "Processo de transformar dados para que não seja mais possível identificar você",
                    },
                  ].map((row) => (
                    <tr
                      key={row.termo}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{row.termo}</td>
                      <td className="px-4 py-2">{row.significado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
