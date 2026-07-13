"use client";

import { EditIcon } from "lucide-react";
import ModalTriggerButton from "../ModalTriggerButton";
import UpdateProgramForm from "../UpdateProgramForm";
import { Program } from "@/schemas/programs/programs-schema";
import type { Cidade } from "@/types/entities/cidade";

type UpdateProgramButtonProps = { id: number; program: Program; userCidade: Cidade | null };

export default function UpdateProgramButton({ id, program, userCidade }: UpdateProgramButtonProps) {
  return (
    <ModalTriggerButton
      icon={EditIcon}
      label="Atualizar programa"
      modalTitle="Atualizar programa"
    >
      <UpdateProgramForm program={program} id={id} userCidade={userCidade} />
    </ModalTriggerButton>
  );
}
