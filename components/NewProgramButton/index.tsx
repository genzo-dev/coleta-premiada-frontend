"use client";

import { Plus } from "lucide-react";
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
        className=" bg-green-700 text-primary-foreground hover:bg-green-800"
      >
        <Plus className="w-4! h-4! " /> Novo programa
      </Button>

      {open && (
        <DefaultModal onClick={() => setOpen(false)} modalTitle="Novo Programa">
          <CreateProgramForm />
        </DefaultModal>
      )}
    </>
  );
}
