"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function PropertySearch({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
      router.refresh();
    });
  }

  function handleClear() {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.delete("search");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 w-full max-w-md"
    >
      <Input
        placeholder="Buscar por inscrição ou titular..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-card w-full"
      />
      <Button
        type="submit"
        className="bg-[#116F51] hover:bg-emerald-800 text-white font-semibold"
        disabled={isPending}
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Buscar"}
      </Button>
      {initialValue && (
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={isPending}
        >
          Limpar
        </Button>
      )}
    </form>
  );
}
