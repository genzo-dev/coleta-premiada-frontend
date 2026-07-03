"use client";

import { EditIcon } from "lucide-react";
import ModalTriggerButton from "../ModalTriggerButton";
import UpdateUserForm from "../UpdateUserForm";
import { UpdateUserDto } from "@/schemas/user/update-user-schema";

type UpdateUserButtonProps = {
  user: UpdateUserDto;
};

export default function UpdateUserButton({ user }: UpdateUserButtonProps) {
  return (
    <ModalTriggerButton
      icon={EditIcon}
      label="Atualizar meus dados"
      modalTitle="Atualizar meus dados"
    >
      <UpdateUserForm user={user} />
    </ModalTriggerButton>
  );
}
