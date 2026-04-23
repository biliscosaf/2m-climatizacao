export const dynamic = "force-dynamic"
// POST /api/lead — Salva lead no banco de dados após conclusão do quiz
// Dispara notificação por email (Resend) e evento na Conversions API (Facebook)
// Rate limiting: máximo 10 requisições por IP por hora (implementado pelo backend-developer)

import { NextRequest, NextResponse } from "next/server"
import { LeadSchema } from "@/lib/validation"
import type { ApiResponse } from "@/lib/validation"
import { prisma } from "@/lib/db"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { sendLeadNotificationEmail } from "@/lib/email"
import { sendFacebookLeadEvent } from "@/lib/facebook"
import { randomUUID } from "crypto"

// Rate limiting simples em-memory (para desenvolvimento)
// Em produção, usar Upstash Redis ou similar
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hora
const RATE_LIMIT_MAX_REQUESTS = 10

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS

  // Limpa entradas antigas
  if (rateLimitMap.has(ip)) {
    const timestamps = rateLimitMap.get(ip)!
    const validTimestamps = timestamps.filter(t => t > windowStart)

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
        { ok: false, error: "Muitos pedidos. Tente novamente em 1 hora." },
        { status: 429 }
      )
    }

    // 2. Parse do body
    const body = await request.json()

    // 3. Validação com Zod (nunca confiar no cliente)
    const parsed = LeadSchema.safeParse(body)
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

    // 4. Salvar no banco de dados
    const lead = await prisma.lead.create({
      data: parsed.data,
    })

    // 5. Gerar URL WhatsApp
    const whatsappUrl = buildWhatsAppUrl(parsed.data)

    // 6. Disparar integrações (não bloquear resposta)
    const eventId = randomUUID()
    void sendLeadNotificationEmail({ ...parsed.data, id: lead.id })
    void sendFacebookLeadEvent(
      parsed.data,
      process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "",
      eventId
    )

    // 7. Retornar URL do WhatsApp para o frontend redirecionar
    return NextResponse.json<ApiResponse<{ whatsappUrl: string }>>(
      { ok: true, data: { whatsappUrl } },
      { status: 201 }
    )
  } catch (error) {
    console.error("[POST /api/lead] Erro:", error)
    return NextResponse.json<ApiResponse>(
      { ok: false, error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
