"use client";

import { PlusIcon } from "lucide-react";
import ModalTriggerButton from "../ModalTriggerButton";
import CreateUserForm from "../CreateUserForm";

export default function CreateUserButton() {
  return (
    <ModalTriggerButton
      icon={PlusIcon}
      label="Criar usuário"
      modalTitle="Criar usuário"
    >
      <CreateUserForm />
    </ModalTriggerButton>
  );
}
