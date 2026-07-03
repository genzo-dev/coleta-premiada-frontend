"use client";

import { EditIcon } from "lucide-react";
import ModalTriggerButton from "../ModalTriggerButton";
import CreateProgramForm from "../CreateProgramForm";
import UpdateProgramForm from "../UpdateProgramForm";
import { Program } from "@/schemas/programs/programs-schema";

type Id = { id: number; program: Program };

export default function UpdateProgramButton({ id, program }: Id) {
  return (
    <ModalTriggerButton
      icon={EditIcon}
      label="Atualizar programa"
      modalTitle="Atualizar programa"
    >
      <UpdateProgramForm program={program} id={id} />
    </ModalTriggerButton>
  );
}
