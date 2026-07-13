#!/usr/bin/env python3
"""
Health check e relatorio de disponibilidade do frontend (coleta-premiada-frontend).

Faz requisicoes para o endpoint /metrics do frontend, verifica disponibilidade
e coleta metricas basicas (status code, tempo de resposta, metricas Prometheus).

Uso:
    python frontend_monitoring_report.py
    python frontend_monitoring_report.py --json --output /tmp/report.json
    python frontend_monitoring_report.py --url http://localhost:3001

Dependencias: requests (ou http.client da stdlib)
"""

import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone
from typing import Any
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError


def get_env(key: str, default: str = "") -> str:
    return os.environ.get(key, default)


def check_endpoint(url: str, timeout: int = 5) -> dict[str, Any]:
    """Verifica a disponibilidade de um endpoint e coleta metricas basicas."""
    start = time.monotonic()
    result: dict[str, Any] = {
        "url": url,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "healthy": False,
        "status_code": None,
        "response_time_ms": None,
        "error": None,
    }

    try:
        req = Request(url, headers={"User-Agent": "ColetaPremiada-HealthCheck/1.0"})
        with urlopen(req, timeout=timeout) as resp:
            result["status_code"] = resp.status
            result["healthy"] = 200 <= resp.status < 400
            result["response_time_ms"] = round((time.monotonic() - start) * 1000, 1)
    except HTTPError as e:
        result["status_code"] = e.code
        result["error"] = f"HTTP {e.code}: {e.reason}"
        result["response_time_ms"] = round((time.monotonic() - start) * 1000, 1)
    except URLError as e:
        result["error"] = f"Connection error: {e.reason}"
    except Exception as e:
        result["error"] = str(e)

    return result


def check_frontend(base_url: str) -> dict[str, Any]:
    """Executa todos os checks contra o frontend."""

    results: dict[str, Any] = {
        "frontend_url": base_url,
        "collected_at": datetime.now(timezone.utc).isoformat(),
        "checks": {},
        "summary": {"total": 0, "healthy": 0, "unhealthy": 0},
    }

    # Check principal: página inicial
    home = check_endpoint(base_url)
    results["checks"]["homepage"] = home

    # Check /metrics
    metrics = check_endpoint(f"{base_url}/metrics")
    results["checks"]["metrics"] = metrics

    # Sumário
    for check in results["checks"].values():
        results["summary"]["total"] += 1
        if check["healthy"]:
            results["summary"]["healthy"] += 1
        else:
            results["summary"]["unhealthy"] += 1

    results["overall_healthy"] = results["summary"]["unhealthy"] == 0
    return results


def format_report(data: dict[str, Any]) -> str:
    """Formata o relatorio em texto."""
    sep = "=" * 60
    lines = [
        sep,
        "  HEALTH CHECK — Frontend (coleta-premiada-frontend)",
        f"  URL: {data['frontend_url']}",
        f"  Gerado em: {data['collected_at']}",
        sep,
    ]

    for name, check in data["checks"].items():
        status = "✓ OK" if check["healthy"] else "✗ FAIL"
        lines.append(
            f"\n  {status}  {name}: {check['url']}"
        )
        if check["status_code"]:
            lines.append(f"         Status: {check['status_code']}")
        if check["response_time_ms"] is not None:
            lines.append(f"         Tempo de resposta: {check['response_time_ms']}ms")
        if check["error"]:
            lines.append(f"         Erro: {check['error']}")

    overall = "✓ SAUDAVEL" if data["overall_healthy"] else "✗ PROBLEMAS DETECTADOS"
    lines.append(f"\n{sep}")
    lines.append(f"  STATUS GERAL: {overall}")
    lines.append(sep)
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Health check do frontend Coleta Premiada"
    )
    parser.add_argument(
        "--url",
        type=str,
        default=get_env("FRONTEND_URL", "http://localhost:3001"),
        help="URL base do frontend (default: http://localhost:3001)",
    )
    parser.add_argument("--json", action="store_true", help="Saida em JSON")
    parser.add_argument("--output", "-o", type=str, help="Arquivo de saida")
    args = parser.parse_args()

    data = check_frontend(args.url)

    if args.json:
        output = json.dumps(data, ensure_ascii=False, indent=2)
    else:
        output = format_report(data)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(output)
        print(f"Relatorio salvo em: {args.output}")
    else:
        print(output)

    sys.exit(0 if data["overall_healthy"] else 1)


if __name__ == "__main__":
    main()
