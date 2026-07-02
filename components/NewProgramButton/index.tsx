"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import CreateProgramForm from "../CreateProgramForm";
import DefaultModal from "../DefaultModal";

type NewProgramButtonProps = {
  onClick?: () => void;
};

export default function NewProgramButton({ onClick }: NewProgramButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        className="sm:text-lg lg:text-xl bg-green-700 text-primary-foreground hover:bg-green-800"
      >
        <PlusIcon /> Novo programa
      </Button>

      {open && (
        <DefaultModal onClick={() => setOpen(false)} modalTitle="Novo Programa">
          <CreateProgramForm />
        </DefaultModal>
      )}
    </>
  );
}
