import { cookies } from "next/headers";
import {
  accessTokenExpires,
  refreshTokenExpires,
} from "@/utils/expires-time-cookies";

export async function setTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  // Flag secure dinâmica: se for true em HTTP local (desenvolvimento), o browser descarta o cookie.
  // Em produção (HTTPS), deve ser sempre true por motivos de segurança.
  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    expires: new Date(Date.now() + accessTokenExpires), // 8 hours
    path: "/",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    expires: new Date(Date.now() + refreshTokenExpires), // 7 days
    path: "/",
  });
}

export async function getTokens() {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get("accessToken")?.value || null,
    refreshToken: cookieStore.get("refreshToken")?.value || null,
  };
}

export async function clearTokens() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
