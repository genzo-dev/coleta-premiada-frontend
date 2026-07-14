import { listColetoresAction } from '@/actions/coletor/list-coletores-action'
import { CreateColetorDialog } from './_components/create-coletor-dialog'
import { ColetoresTable } from './_components/coletores-table'

type SearchParams = {
  search?: string
  ativo?: string
}

export default async function ColetoresPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const { coletores, error } = await listColetoresAction({
    search: params.search,
    ativo: params.ativo === 'true' ? true : params.ativo === 'false' ? false : undefined,
  })

  const total = coletores.length
  const ativos = coletores.filter((c) => c.ativo).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Coletores</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {total} coletor{total !== 1 ? 'es' : ''} cadastrado{total !== 1 ? 's' : ''} · {ativos} ativo{ativos !== 1 ? 's' : ''}
          </p>
        </div>
        <CreateColetorDialog />
      </div>

      <form method="GET" className="flex gap-3 items-center">
        <input
          type="text"
          name="search"
          defaultValue={params.search ?? ''}
          placeholder="Buscar por matrícula, nome ou e-mail..."
          className="flex-1 max-w-sm px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          name="ativo"
          defaultValue={params.ativo ?? ''}
          className="px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todos</option>
          <option value="true">Ativos</option>
          <option value="false">Inativos</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-[#116F51] text-white rounded-md hover:bg-[#0d5a41] transition-colors"
        >
          Filtrar
        </button>
        {(params.search || params.ativo) && (
          <a
            href="/coletores"
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Limpar
          </a>
        )}
      </form>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      ) : (
        <ColetoresTable coletores={coletores} />
      )}
    </div>
  )
}
