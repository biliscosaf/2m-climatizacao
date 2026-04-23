// GET /api/quiz/stats — Retorna estatísticas de abandono do quiz
// Útil para análise de UX e taxa de conversão
// Em produção, este endpoint deve ter autenticação (v2 — não está no MUST desta iteração)

import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import type { ApiResponse } from "@/lib/validation"

interface QuizStats {
  totalSessions: number
  completionRate: number // percentual de sessões que chegaram à pergunta 6
  abandonmentByQuestion: Record<number, number> // { "1": 5, "2": 3, "3": 2 }
  avgProgressionDepth: number
}

export async function GET() {
  try {
    // Recupera todos os quiz progress
    const sessions = await prisma.quizProgress.findMany()

    const totalSessions = sessions.length
    const completedSessions = sessions.filter((s) => s.pergunta === 6).length
    const completionRate =
      totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0

    // Conta abandonos por pergunta
    const abandonmentByQuestion: Record<number, number> = {}
    for (const session of sessions) {
      if (session.pergunta < 6) {
        abandonmentByQuestion[session.pergunta] =
          (abandonmentByQuestion[session.pergunta] || 0) + 1
      }
    }

    // Calcula profundidade média de progressão
    const avgProgressionDepth =
      totalSessions > 0
        ? sessions.reduce((sum, s) => sum + s.pergunta, 0) / totalSessions
        : 0

    const stats: QuizStats = {
      totalSessions,
      completionRate: Math.round(completionRate * 100) / 100, // 2 casas decimais
      abandonmentByQuestion,
      avgProgressionDepth: Math.round(avgProgressionDepth * 100) / 100,
    }

    return NextResponse.json<ApiResponse<QuizStats>>(
      { ok: true, data: stats },
      {
        headers: {
          // Cache de 5 minutos para estatísticas
          "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
        },
      }
    )
  } catch (error) {
    console.error("[GET /api/quiz/stats] Erro:", error)
    return NextResponse.json<ApiResponse>(
      { ok: false, error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
