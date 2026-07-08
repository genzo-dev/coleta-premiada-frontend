"use client";

import { EditIcon } from "lucide-react";
import ModalTriggerButton from "../ModalTriggerButton";
import UpdateProgramRulesForm from "../UpdateProgramRulesForm";
import { UpdateProgramRules } from "@/schemas/programs/update-program-rules-schema";

type Id = { id: number; programRules: UpdateProgramRules };

export default function UpdateProgramRulesButton({ id, programRules }: Id) {
  return (
    <ModalTriggerButton
      icon={EditIcon}
      label="Atualizar regras do programa"
      modalTitle="Atualizar regras do programa"
    >
      <UpdateProgramRulesForm programRules={programRules} id={id} />
    </ModalTriggerButton>
  );
}
