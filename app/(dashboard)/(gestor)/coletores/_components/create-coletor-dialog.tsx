'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createColetorAction } from '@/actions/coletor/create-coletor-action'

export function CreateColetorDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    matricula: '',
    nome: '',
    email: '',
    zona: '',
    cargo: '',
    senha: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const result = await createColetorAction({
        matricula: form.matricula,
        senha: form.senha,
        nome: form.nome,
        email: form.email,
        zona: form.zona,
        cargo: form.cargo,
      })

      if (result.error) {
        setError(result.error)
        return
      }

      setOpen(false)
      setForm({ matricula: '', nome: '', email: '', zona: '', cargo: '', senha: '' })
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#116F51] hover:bg-[#0d5a41] text-white gap-2">
          <Plus className="h-4 w-4" />
          Novo Coletor
        </Button>
      </DialogTrigger>
      <DialogContent title="Cadastrar Coletor" className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="matricula">Matrícula *</Label>
              <Input
                id="matricula"
                name="matricula"
                value={form.matricula}
                onChange={handleChange}
                placeholder="Ex: MAT001"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="senha">Senha *</Label>
              <Input
                id="senha"
                name="senha"
                type="password"
                value={form.senha}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome do coletor"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="zona">Zona</Label>
              <Input
                id="zona"
                name="zona"
                value={form.zona}
                onChange={handleChange}
                placeholder="Ex: Zona Norte"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                id="cargo"
                name="cargo"
                value={form.cargo}
                onChange={handleChange}
                placeholder="Agente de coleta"
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#116F51] hover:bg-[#0d5a41] text-white"
              disabled={isPending}
            >
              {isPending ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
