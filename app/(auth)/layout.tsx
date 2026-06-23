import clsx from "clsx";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={clsx(
        "flex flex-col min-h-screen items-center justify-center",
        "lg:flex-row lg:items-stretch  lg:justify-around gap-12 lg:gap-0",
        "bg-gray-300",
      )}
    >
      <div className="lg:w-3/5  flex items-center justify-center">
        <h1 className="text-5xl text-center">Coleta Premiada</h1>
      </div>

      <div
        className={clsx(
          "flex items-center justify-center rounded-xl py-8 px-8",
          "lg:w-2/5 lg:rounded-none lg:py-0 lg:px-18 xl:px-24",
          "text-white bg-black",
        )}
      >
        {children}
      </div>
    </div>
  );
}
