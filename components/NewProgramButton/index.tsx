"use client";

import { PlusIcon } from "lucide-react";
import ModalTriggerButton from "../ModalTriggerButton";
import CreateProgramForm from "../CreateProgramForm";

export default function NewProgramButton() {
  return (
    <ModalTriggerButton
      icon={PlusIcon}
      label="Novo programa"
      modalTitle="Novo programa"
    >
      <CreateProgramForm />
    </ModalTriggerButton>
  );
}
