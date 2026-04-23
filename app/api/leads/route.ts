// GET /api/leads — Retorna estatísticas agregadas de leads (zero PII exposta)
// Rate-limited: 5 requisições por IP por hora
// Dados individuais requerem autenticação (implementado em v2)

import { NextResponse, type NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import type { ApiResponse } from "@/lib/validation"

// Rate limit simples em memória para dev
// Em produção, usar Upstash Redis para distribuído
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getRateLimitKey(ip: string): string {
  return `rate-limit:${ip}`
}

function checkRateLimit(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const limitData = rateLimitMap.get(key)

  if (!limitData || now > limitData.resetAt) {
    // Novo período ou expirou
    rateLimitMap.set(key, { count: 1, resetAt: now + 3600000 }) // 1 hora
    return true
  }

  if (limitData.count < 5) {
    limitData.count++
    return true
  }

  return false
}

export async function GET(req: NextRequest) {
  try {
    // Rate limiting: 5 requisições por IP por hora
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown"

    if (!checkRateLimit(ip)) {
      return NextResponse.json<ApiResponse>(
        { ok: false, error: "Muitas requisições. Tente novamente em 1 hora." },
        { status: 429 }
      )
    }

    // Retorna APENAS agregados (nenhuma PII individual)
    const totalLeads = await prisma.lead.count()
    const dateRange = await prisma.lead.aggregate({
      _min: { createdAt: true },
      _max: { createdAt: true },
    })

    return NextResponse.json<ApiResponse>(
      {
        ok: true,
        data: {
          totalLeads,
          firstLeadAt: dateRange._min.createdAt,
          lastLeadAt: dateRange._max.createdAt,
          message:
            "Para acessar dados detalhados de leads, use a API autenticada (v2)",
        },
      },
      {
        headers: {
          // Cache de 5 minutos para agregados
          "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
          // Headers de segurança
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    )
  } catch (error) {
    console.error("[GET /api/leads] Erro:", error)
    return NextResponse.json<ApiResponse>(
      { ok: false, error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
