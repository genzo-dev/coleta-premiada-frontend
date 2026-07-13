"use client";

import { MdAdd } from "react-icons/md";
import ModalTriggerButton from "@/components/ModalTriggerButton";
import CreateCidadeForm from "./create-cidade-form";

export default function NewCidadeButton() {
  return (
    <ModalTriggerButton label="Nova cidade" modalTitle="Nova cidade" icon={MdAdd}>
      <CreateCidadeForm />
    </ModalTriggerButton>
  );
}
