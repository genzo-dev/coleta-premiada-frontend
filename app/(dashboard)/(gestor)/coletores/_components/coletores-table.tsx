'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { PowerOff, Power } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toggleColetorAtivoAction } from '@/actions/coletor/toggle-coletor-action'
import { EditColetorDialog } from './edit-coletor-dialog'
import type { Coletor } from '@/actions/coletor/list-coletores-action'

type Props = {
  coletores: Coletor[]
}

function ToggleAtivoButton({ coletor }: { coletor: Coletor }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(async () => {
      await toggleColetorAtivoAction(coletor.id, !coletor.ativo)
      router.refresh()
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={handleToggle}
      disabled={isPending}
      title={coletor.ativo ? 'Desativar coletor' : 'Ativar coletor'}
    >
      {coletor.ativo ? (
        <PowerOff className="h-4 w-4 text-red-500" />
      ) : (
        <Power className="h-4 w-4 text-green-600" />
      )}
    </Button>
  )
}

export function ColetoresTable({ coletores }: Props) {
  if (coletores.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Nenhum coletor encontrado.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Matrícula</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nome</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">E-mail</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Zona</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Cargo</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Cadastrado em</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {coletores.map((coletor) => (
            <tr key={coletor.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-mono font-medium">{coletor.matricula}</td>
              <td className="px-4 py-3">{coletor.nome || '—'}</td>
              <td className="px-4 py-3 text-muted-foreground">{coletor.email || '—'}</td>
              <td className="px-4 py-3">{coletor.zona || '—'}</td>
              <td className="px-4 py-3">{coletor.cargo || '—'}</td>
              <td className="px-4 py-3">
                {coletor.ativo ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">
                    Ativo
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0">
                    Inativo
                  </Badge>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(coletor.criado_em).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <EditColetorDialog coletor={coletor} />
                  <ToggleAtivoButton coletor={coletor} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
