import clsx from "clsx";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={clsx(
        "flex flex-col min-h-screen items-center justify-center",
        "lg:flex-row lg:items-stretch lg:justify-around gap-12 lg:gap-0",
        "bg-gray-300",
      )}
    >
      <div className="lg:w-3/5  flex items-center justify-center">
        <h1 className="text-5xl text-center">Coleta Premiada</h1>
      </div>

      <div
        className={clsx(
          "w-full max-w-md flex items-center justify-center rounded-xl py-8 px-6",
          "lg:w-2/5 lg:max-w-none lg:rounded-none lg:py-0 lg:px-18 xl:px-24",
          "text-white bg-black",
        )}
      >
        {children}
      </div>
    </div>
  );
}
