"use client";

import { EditIcon } from "lucide-react";
import ModalTriggerButton from "../ModalTriggerButton";
import UpdateUserForm from "../UpdateUserForm";
import { User } from "@/schemas/user/user-schema";
import { UpdateUserDto } from "@/schemas/user/update-user-schema";
import { Usuario } from "@/types/entities/usuario";

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
