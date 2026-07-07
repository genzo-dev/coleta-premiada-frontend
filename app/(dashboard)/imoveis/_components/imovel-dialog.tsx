"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { criarImovelAction } from "@/actions/imovel/criar-imovel-action";
import { editarImovelAction } from "@/actions/imovel/editar-imovel-action";
import { obterImovelDetalheAction } from "@/actions/imovel/obter-imovel-detalhe-action";
import { buscarMoradoresAction, type MoradorUser } from "@/actions/user/buscar-moradores-action";
import { buscarCidadesAction, type Cidade } from "@/actions/cidade/buscar-cidades-action";
import { MdEdit, MdAdd } from "react-icons/md";
import type { Imovel } from "@/types/entities/imovel";

type ImovelDialogProps = {
  mode: "create" | "edit";
  imovel?: Imovel & { titular_nome?: string };
};

export default function ImovelDialog({ mode, imovel }: ImovelDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fetchingDetails, setFetchingDetails] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [moradoresList, setMoradoresList] = React.useState<MoradorUser[]>([]);
  const [cidadesList, setCidadesList] = React.useState<Cidade[]>([]);

  // Form states
  const [inscricao, setInscricao] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [logradouro, setLogradouro] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [complemento, setComplemento] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [cidade, setCidade] = React.useState("");
  const [estado, setEstado] = React.useState("");
  const [numMoradores, setNumMoradores] = React.useState("1");
  const [ativo, setAtivo] = React.useState(true);
  const [titularId, setTitularId] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setErrors([]);

      buscarCidadesAction().then((res) => {
        if (res.success) {
          setCidadesList(res.data);
        }
      });

      if (mode === "edit" && imovel?.id) {
        setFetchingDetails(true);
        // Primeiro coloca os dados parciais que temos na tabela para não ficar em branco
        setInscricao(imovel.inscricao || "");
        setBairro(imovel.bairro || "");
        setAtivo(imovel.ativo !== false);
        setTitularId(imovel.titular ? String(imovel.titular) : "");

        // Faz a chamada para carregar os detalhes completos de endereço e moradores a partir do Core
        obterImovelDetalheAction(imovel.id).then((res) => {
          setFetchingDetails(false);
          if (res.success && res.data) {
            const data = res.data;
            // Preenche o formulário com os dados do endereço completo recuperados do Core
            setInscricao(data.inscricao || "");
            setCep(data.cep || "");
            setLogradouro(data.logradouro || "");
            setNumero(data.numero || "");
            setComplemento(data.complemento || "");
            setBairro(data.bairro || "");
            setCidade(data.cidade || "");
            setEstado(data.estado || "");
            setNumMoradores(String(data.num_moradores || 1));
            setAtivo(data.ativo !== false);
            setTitularId(data.titular ? String(data.titular) : "");
          } else {
            setErrors([res.error || "Não foi possível carregar os detalhes do imóvel."]);
          }
        });
      } else {
        // Modo criação
        setInscricao("");
        setCep("");
        setLogradouro("");
        setNumero("");
        setComplemento("");
        setBairro("");
        setCidade("");
        setEstado("");
        setNumMoradores("1");
        setAtivo(true);
        setTitularId("");

        buscarMoradoresAction().then((res) => {
          if (res.success) {
            setMoradoresList(res.data);
          }
        });
      }
    }
  }, [open, imovel, mode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const payload = {
      inscricao,
      cep,
      logradouro,
      numero,
      complemento: complemento || undefined,
      bairro,
      cidade,
      estado,
      num_moradores: parseInt(numMoradores) || 1,
      ativo,
      titular: mode === "create" ? (parseInt(titularId) || undefined) : undefined,
    };

    let result;
    if (mode === "create") {
      if (!titularId) {
        setErrors(["Selecione o morador titular do imóvel."]);
        setLoading(false);
        return;
      }
      result = await criarImovelAction(payload);
    } else {
      if (!imovel?.id) return;
      result = await editarImovelAction(imovel.id, payload);
    }

    setLoading(false);

    if (result.success) {
      setOpen(false);
    } else {
      setErrors(result.errors);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="bg-[#116F51] hover:bg-[#1A5538] text-white flex items-center gap-1.5 h-9 text-sm px-4 rounded-lg font-medium cursor-pointer">
            <MdAdd className="w-5 h-5" />
            Adicionar Imóvel
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-1 text-xs border-border hover:bg-muted/50 cursor-pointer">
            <MdEdit className="w-4 h-4 text-muted-foreground" />
            Editar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        title={mode === "create" ? "Adicionar Novo Imóvel" : "Editar Imóvel"}
        description={
          mode === "create"
            ? "Cadastre um novo imóvel no sistema. Ele será sincronizado automaticamente com os coletores."
            : "Atualize os dados cadastrais deste imóvel no sistema."
        }
      >
        {fetchingDetails ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <div className="w-6 h-6 border-2 border-[#116F51] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-muted-foreground">Carregando detalhes do imóvel...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errors.length > 0 && (
              <div className="rounded-lg bg-destructive/15 p-3 text-xs text-destructive flex flex-col gap-1">
                {errors.map((err, idx) => (
                  <span key={idx}>{err}</span>
                ))}
              </div>
            )}

            {mode === "create" && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="titular">Morador Titular*</Label>
                <select
                  id="titular"
                  value={titularId}
                  onChange={(e) => setTitularId(e.target.value)}
                  required
                  className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring dark:bg-input/30"
                >
                  <option value="" disabled className="text-muted-foreground dark:bg-neutral-900">
                    Selecione um morador titular...
                  </option>
                  {moradoresList.map((morador) => (
                    <option key={morador.id} value={morador.id} className="text-foreground dark:bg-neutral-900">
                      {morador.nome} ({morador.email})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inscricao">Inscrição Imobiliária (IPTU)*</Label>
              <Input
                id="inscricao"
                placeholder="Ex: 12345678"
                value={inscricao}
                onChange={(e) => setInscricao(e.target.value)}
                required
                disabled={mode === "edit"}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cep">CEP*</Label>
                <Input
                  id="cep"
                  placeholder="Ex: 60000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="numMoradores">Nº de Moradores*</Label>
                <Input
                  id="numMoradores"
                  type="number"
                  min="1"
                  value={numMoradores}
                  onChange={(e) => setNumMoradores(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label htmlFor="logradouro">Logradouro*</Label>
                <Input
                  id="logradouro"
                  placeholder="Ex: Rua A"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="numero">Número*</Label>
                <Input
                  id="numero"
                  placeholder="Ex: 123"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="complemento">Complemento</Label>
              <Input
                id="complemento"
                placeholder="Ex: Ap 101, Casa B"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bairro">Bairro*</Label>
              <Input
                id="bairro"
                placeholder="Ex: Centro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label htmlFor="cidade">Cidade*</Label>
                <select
                  id="cidade"
                  value={cidade}
                  onChange={(e) => {
                    const selectedCityName = e.target.value;
                    setCidade(selectedCityName);
                    const foundCity = cidadesList.find((c) => c.nome === selectedCityName);
                    if (foundCity) {
                      setEstado(foundCity.uf);
                    }
                  }}
                  required
                  className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring dark:bg-input/30"
                >
                  <option value="" disabled className="text-muted-foreground dark:bg-neutral-900">
                    Selecione a cidade...
                  </option>
                  {cidadesList.map((city) => (
                    <option key={city.id} value={city.nome} className="text-foreground dark:bg-neutral-900">
                      {city.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="estado">Estado (UF)*</Label>
                <Input
                  id="estado"
                  maxLength={2}
                  placeholder="Ex: CE"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value.toUpperCase())}
                  required
                  disabled
                />
              </div>
            </div>

            {mode === "edit" && (
              <div className="flex items-center gap-2 py-2 border-t border-border mt-2">
                <input
                  id="ativo"
                  type="checkbox"
                  checked={ativo}
                  onChange={(e) => setAtivo(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#116F51] focus:ring-[#116F51] cursor-pointer"
                />
                <Label htmlFor="ativo" className="cursor-pointer font-semibold">
                  Imóvel Ativo (Elegível para coletas)
                </Label>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 border-t border-border pt-4 mt-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#116F51] hover:bg-[#1A5538] text-white cursor-pointer"
              >
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
