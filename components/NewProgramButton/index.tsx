"use client";

import { PlusIcon } from "lucide-react";
import ModalTriggerButton from "../ModalTriggerButton";
import CreateProgramForm from "../CreateProgramForm";
import type { Cidade } from "@/types/entities/cidade";

type NewProgramButtonProps = {
  userCidade: Cidade | null;
};

export default function NewProgramButton({ userCidade }: NewProgramButtonProps) {
  return (
    <ModalTriggerButton
      icon={PlusIcon}
      label="Novo programa"
      modalTitle="Novo programa"
    >
      <CreateProgramForm userCidade={userCidade} />
    </ModalTriggerButton>
  );
}
