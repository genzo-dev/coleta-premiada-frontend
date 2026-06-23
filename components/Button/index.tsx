import clsx from "clsx";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
} & React.ComponentProps<"button">;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "flex flex-col py-2 rounded-sm w-full min-h-10 mt-2 justify-center items-center",
        "bg-white text-black transition hover:brightness-90 hover:cursor-pointer",
        "disabled:bg-white/70 disabled:cursor-not-allowed",
      )}
    >
      {children}
    </button>
  );
}
