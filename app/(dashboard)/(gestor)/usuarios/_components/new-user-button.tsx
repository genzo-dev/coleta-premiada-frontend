"use client";

import { MdPersonAdd } from "react-icons/md";
import ModalTriggerButton from "@/components/ModalTriggerButton";
import CreateUserForm from "./create-user-form";
import type { Cidade } from "@/types/entities/cidade";

type NewUserButtonProps = {
  cidades: Cidade[];
  hideGerenteGeral?: boolean;
};

export default function NewUserButton({
  cidades,
  hideGerenteGeral,
}: NewUserButtonProps) {
  return (
    <ModalTriggerButton
      label="Novo usuário"
      modalTitle="Novo usuário"
      icon={MdPersonAdd}
    >
      <CreateUserForm cidades={cidades} hideGerenteGeral={hideGerenteGeral} />
    </ModalTriggerButton>
  );
}
