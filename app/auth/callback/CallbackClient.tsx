"use client";

import googleAuthAction from "@/actions/auth/google-auth-action";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) return;

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    googleAuthAction({
      code,
      redirect_uri: `${appUrl}/auth/callback`,
      errors: [],
    });
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-4 md:gap-8 items-center justify-center h-screen">
      <h2 className="text-6xl md:text-8xl text-green-900 font-black">
        Quase lá!
      </h2>

      <p className="text-lg md:text-2xl text-gray-600">
        Preparando tudo para você acessar sua conta.
      </p>

      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce [animation-delay:0.2s]" />
        <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
