"use client";

import { getGoogleLoginUrl } from "@/utils/google-login-url";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function GoogleAuthButton() {
  const url = getGoogleLoginUrl();

  return (
    <Link
      className="flex font-medium text-sm text-gray-700 items-center justify-center gap-3 border border-gray-300 bg-white px-6 py-2.5 rounded-lg hover:bg-gray-100 transition cursor-pointer shadow-sm"
      href={url}
    >
      <FaGoogle /> Entrar com Google
    </Link>
  );
}
