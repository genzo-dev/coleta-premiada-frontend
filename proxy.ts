import { NextRequest, NextResponse } from "next/server";

import {
  accessTokenExpires,
  refreshTokenExpires,
} from "./utils/expires-time-cookies";
import { apiRequest } from "./lib/api-request";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken) {
    const me = await apiRequest("/api/accounts/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (me.success) {
      return NextResponse.next();
    }
  }

  if (refreshToken) {
    const newRefresh = await fetch(
      `${process.env.CORE_API_URL}/api/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      },
    );

    if (!newRefresh.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const data = await newRefresh.json();

    const response = NextResponse.next();

    if (!accessToken && refreshToken && newRefresh.ok) {
      response.cookies.set("accessToken", data.access, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + accessTokenExpires), // 8 horas
        path: "/",
      });
      response.cookies.set("refreshToken", data.refresh, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + refreshTokenExpires), // 7 days
        path: "/",
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login|register|$).*)"],
};
