import clsx from "clsx";
import { useId } from "react";

type InputSelectProps = {
  labelText?: string;
  children: React.ReactNode;
} & React.ComponentProps<"select">;

export default function InputSelect({
  labelText,
  children,
  ...props
}: InputSelectProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {labelText && <label htmlFor={id}>{labelText}</label>}

      <select
        {...props}
        className={clsx(
          "px-2 py-1 lg:py-2 rounded-sm outline-none border-2 w-full",
          "bg-white placeholder-[#878787] border-transparent focus:border-black/50 text-black",
          "disabled:border-2 disabled:border-slate-400 disabled:bg-slate-300 disabled:cursor-not-allowed",
        )}
        id={id}
      >
        {children}
      </select>
    </div>
  );
}
