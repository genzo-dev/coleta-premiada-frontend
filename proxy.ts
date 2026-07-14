import { NextRequest, NextResponse } from "next/server";

import {
  accessTokenExpires,
  refreshTokenExpires,
} from "./utils/expires-time-cookies";
import { apiRequest } from "./lib/api-request";

function getRoutePattern(pathname: string): string {
  return pathname
    .split("/")
    .map((segment) => {
      if (
        /^[0-9a-f]{24}$/.test(segment) ||
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
          segment,
        ) ||
        /^\d+$/.test(segment)
      ) {
        return ":id";
      }
      return segment;
    })
    .join("/");
}

function withMetrics(
  response: NextResponse,
  pathname: string,
  method: string,
  start: number,
): NextResponse {
  const durationMs = Date.now() - start;
  response.headers.set("X-Response-Time-Ms", durationMs.toString());
  response.headers.set("X-Metrics-Route", getRoutePattern(pathname));
  response.headers.set("X-Metrics-Status", response.status.toString());
  response.headers.set("X-Metrics-Method", method);
  return response;
}

export async function proxy(req: NextRequest) {
  const start = Date.now();
  const { pathname } = req.nextUrl;
  const method = req.method;

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
      return withMetrics(NextResponse.next(), pathname, method, start);
    }

    if (!me.success && me.status === 403) {
      return NextResponse.redirect(
        new URL("/confirmar-email/pendente", req.url),
      );
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
        expires: new Date(Date.now() + accessTokenExpires),
        path: "/",
      });
      response.cookies.set("refreshToken", data.refresh, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + refreshTokenExpires),
        path: "/",
      });
      return withMetrics(response, pathname, method, start);
    }
  }

  return withMetrics(NextResponse.next(), pathname, method, start);
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|regulamento|politica-de-privacidade|termos-de-uso|login|register|auth/callback|confirmar-email|api/metrics|metrics|.*\\..*).*)",
  ],
};
