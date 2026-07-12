import { NextRequest, NextResponse } from "next/server";
import { getTokens } from "@/lib/auth/manage-login";
import { apiUrl } from "@/lib/api-request";

export async function GET(request: NextRequest) {
  const tokens = await getTokens();

  if (!tokens?.accessToken) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const query = new URLSearchParams();
  query.set("formato", "csv");

  for (const [key, value] of searchParams.entries()) {
    if (key !== "formato") query.set(key, value);
  }

  const coreUrl = `${apiUrl}/api/audit/logs/export?${query.toString()}`;

  const coreResponse = await fetch(coreUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  if (!coreResponse.ok) {
    return NextResponse.json(
      { error: "Erro ao exportar auditoria." },
      { status: coreResponse.status },
    );
  }

  const contentDisposition =
    coreResponse.headers.get("Content-Disposition") ??
    'attachment; filename="auditoria.csv"';
  const contentType =
    coreResponse.headers.get("Content-Type") ?? "text/csv; charset=utf-8";

  return new NextResponse(coreResponse.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
    },
  });
}
