"use client"

import * as React from "react"
import { useState, useActionState } from "react"
import { createPropertyAction } from "@/actions/program/property-actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function PropertyForm() {
  const initialState = {
    errors: [],
  }

  const [state, action, isPending] = useActionState(createPropertyAction, initialState)

  const [cep, setCep] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [numMoradores, setNumMoradores] = useState("1")

  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [cepError, setCepError] = useState("")

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const rawCep = e.target.value
    const cleanCep = rawCep.replace(/\D/g, "")
    
    if (cleanCep.length !== 8) {
      setCepError("O CEP deve conter 8 dígitos")
      return
    }
    
    setCepError("")
    setIsLoadingCep(true)
    
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await res.json()
      
      if (!data.erro) {
        setLogradouro(data.logradouro || "")
        setBairro(data.bairro || "")
        setCidade(data.localidade || "")
        setEstado(data.uf || "")
      } else {
        setCepError("CEP não encontrado")
      }
    } catch (err) {
      console.error("ViaCEP lookup error:", err)
      setCepError("Erro ao buscar CEP")
    } finally {
      setIsLoadingCep(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto bg-white border border-morador-outline-variant/30">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-morador-primary">Cadastrar Novo Imóvel</CardTitle>
        <CardDescription>Preencha os dados do seu imóvel residencial abaixo para aderir ao programa.</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form action={action} className="space-y-4" noValidate>
          {/* CEP e Número de moradores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cep" className="text-sm font-semibold text-morador-primary">CEP</Label>
              <div className="relative">
                <Input
                  id="cep"
                  name="cep"
                  type="text"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={handleCepBlur}
                  disabled={isPending || isLoadingCep}
                  required
                />
                {isLoadingCep && (
                  <div className="absolute right-3 top-2 text-morador-outline">
                    <Loader2 className="animate-spin w-4 h-4" />
                  </div>
                )}
              </div>
              {cepError && <span className="text-xs text-red-600 font-medium">{cepError}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="num_moradores" className="text-sm font-semibold text-morador-primary">Número de Moradores</Label>
              <Input
                id="num_moradores"
                name="num_moradores"
                type="number"
                min="1"
                value={numMoradores}
                onChange={(e) => setNumMoradores(e.target.value)}
                disabled={isPending}
                required
              />
            </div>
          </div>

          {/* Logradouro */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="logradouro" className="text-sm font-semibold text-morador-primary">Logradouro (Rua, Avenida, etc.)</Label>
            <Input
              id="logradouro"
              name="logradouro"
              type="text"
              placeholder="Ex: Rua das Flores"
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              disabled={isPending || isLoadingCep}
              required
            />
          </div>

          {/* Número e Complemento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-1">
              <Label htmlFor="numero" className="text-sm font-semibold text-morador-primary">Número</Label>
              <Input
                id="numero"
                name="numero"
                type="text"
                placeholder="Ex: 123"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                disabled={isPending}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="complemento" className="text-sm font-semibold text-morador-primary">Complemento (opcional)</Label>
              <Input
                id="complemento"
                name="complemento"
                type="text"
                placeholder="Ex: Apto 101, Bloco B"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>

          {/* Bairro, Cidade, Estado */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-5">
              <Label htmlFor="bairro" className="text-sm font-semibold text-morador-primary">Bairro</Label>
              <Input
                id="bairro"
                name="bairro"
                type="text"
                placeholder="Ex: Centro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                disabled={isPending || isLoadingCep}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-5">
              <Label htmlFor="cidade" className="text-sm font-semibold text-morador-primary">Cidade</Label>
              <Input
                id="cidade"
                name="cidade"
                type="text"
                placeholder="Ex: Sobral"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                disabled={isPending || isLoadingCep}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="estado" className="text-sm font-semibold text-morador-primary">UF</Label>
              <Input
                id="estado"
                name="estado"
                type="text"
                placeholder="CE"
                maxLength={2}
                value={estado}
                onChange={(e) => setEstado(e.target.value.toUpperCase())}
                disabled={isPending || isLoadingCep}
                className="uppercase"
                required
              />
            </div>
          </div>

          {/* Erros Gerais do Backend/Zod */}
          {state?.errors && state.errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm space-y-1">
              {state.errors.map((err, idx) => (
                <p key={idx} className="font-medium">• {err}</p>
              ))}
            </div>
          )}

          {/* Sucesso */}
          {state?.success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
              ✓ Imóvel cadastrado com sucesso!
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending || isLoadingCep}
            className="w-full h-11 text-base bg-[#003629] hover:bg-emerald-950 text-white mt-4 font-bold rounded-xl"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" />
                Cadastrando...
              </span>
            ) : (
              "Salvar Imóvel"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
