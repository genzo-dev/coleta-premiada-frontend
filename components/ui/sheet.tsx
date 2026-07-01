"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { MdClose } from "react-icons/md";
import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetPortal = Dialog.Portal;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  title,
  description,
  ...props
}: React.ComponentProps<typeof Dialog.Content> & {
  title: string;
  description?: string;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col border-l border-border bg-background shadow-xl transition-transform duration-300",
          "sm:max-w-lg",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div className="flex flex-col gap-0.5">
            <Dialog.Title className="text-base font-semibold text-foreground">
              {title}
            </Dialog.Title>
            {description && (
              <Dialog.Description className="text-sm text-muted-foreground">
                {description}
              </Dialog.Description>
            )}
          </div>
          <SheetClose className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <MdClose className="h-5 w-5" />
            <span className="sr-only">Fechar</span>
          </SheetClose>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </Dialog.Content>
    </SheetPortal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetPortal, SheetOverlay, SheetContent };
