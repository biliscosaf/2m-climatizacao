export const dynamic = "force-dynamic"
// POST /api/quiz/progress — Salva progresso parcial do quiz (rastreamento de abandono)
// Usado para análise de qual etapa tem maior abandono
// Rate limiting: máximo 50 requisições por IP por hora

import { NextRequest, NextResponse } from "next/server"
import { QuizProgressSchema } from "@/lib/validation"
import type { ApiResponse } from "@/lib/validation"
import { prisma } from "@/lib/db"

// Rate limiting simples em-memory para quiz/progress
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hora
const RATE_LIMIT_MAX_REQUESTS = 50

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS

  // Limpa entradas antigas
  if (rateLimitMap.has(ip)) {
    const timestamps = rateLimitMap.get(ip)!
    const validTimestamps = timestamps.filter((t) => t > windowStart)

    if (validTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
      return false
    }

    validTimestamps.push(now)
    rateLimitMap.set(ip, validTimestamps)
  } else {
    rateLimitMap.set(ip, [now])
  }

  return true
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar rate limiting
    const clientIp = getClientIp(request)
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: "Muitos pedidos. Tente novamente em 1 hora.",
        },
        { status: 429 }
      )
    }

    // 2. Parse do body
    const body = await request.json()

    // 3. Validação com Zod
    const parsed = QuizProgressSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: "Dados inválidos",
          details: parsed.error.errors,
        },
        { status: 400 }
      )
    }

    // 4. Upsert — atualiza se session já existe, cria se não
    await prisma.quizProgress.upsert({
      where: { session: parsed.data.session },
      create: {
        session: parsed.data.session,
        pergunta: parsed.data.pergunta,
        respostas: JSON.stringify(parsed.data.respostas),
      },
      update: {
        pergunta: parsed.data.pergunta,
        respostas: JSON.stringify(parsed.data.respostas),
      },
    })

    // 5. Resposta de sucesso
    return NextResponse.json<ApiResponse>(
      { ok: true, data: null },
      { status: 200 }
    )
  } catch (error) {
    console.error("[POST /api/quiz/progress] Erro:", error)
    return NextResponse.json<ApiResponse>(
      { ok: false, error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
