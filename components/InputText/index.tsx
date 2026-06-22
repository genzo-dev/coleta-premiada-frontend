import clsx from "clsx";
import { useId } from "react";

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export default function InputText({ labelText, ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {labelText && <label htmlFor={id}>{labelText}</label>}

      <input
        {...props}
        className={clsx(
          "px-2 rounded-sm outline-none border-2 w-full",
          "bg-white placeholder-[#878787] border-transparent focus:border-[#6DB571] text-black",
          "disabled:border-2 disabled:border-slate-400 disabled:bg-slate-300 disabled:cursor-not-allowed",
        )}
        id={id}
      />
    </div>
  );
}
