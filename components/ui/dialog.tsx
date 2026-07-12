"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { MdClose } from "react-icons/md";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;



function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  title: string;
  description?: string;
}

function DialogContent({
  className,
  children,
  title,
  description,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-[50%] top-[50%] z-50 flex w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-border bg-background p-6 shadow-xl transition-all duration-200 rounded-xl",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <DialogPrimitive.Title className="text-lg font-semibold text-foreground leading-none">
              {title}
            </DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className="text-sm text-muted-foreground mt-1">
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
          <DialogClose className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <MdClose className="h-5 w-5" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </div>
        <div className="flex-1 mt-2">{children}</div>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export { Dialog, DialogTrigger, DialogClose, DialogPortal, DialogOverlay, DialogContent };
