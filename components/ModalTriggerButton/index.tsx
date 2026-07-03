"use client";

import { Button } from "../ui/button";
import { ElementType, useState } from "react";
import DefaultModal from "../DefaultModal";

type NewProgramButtonProps = {
  label: string;
  modalTitle: string;
  icon?: ElementType;
  children: React.ReactNode;
};

export default function ModalTriggerButton({
  label,
  modalTitle,
  icon: Icon,
  children,
}: NewProgramButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className=" bg-green-700 text-primary-foreground hover:bg-green-800"
      >
        {Icon && <Icon className="w-4! h-4!" />}
        {label}
      </Button>

      {open && (
        <DefaultModal onClick={() => setOpen(false)} modalTitle={modalTitle}>
          {children}
        </DefaultModal>
      )}
    </>
  );
}
