"use client";

import googleAuthAction from "@/actions/auth/google-auth-action";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) return;

    googleAuthAction({
      code,
      redirect_uri: "http://localhost:3001/auth/callback",
      errors: [],
    });
  }, [searchParams]);

  return <p>Autenticando...</p>;
}
