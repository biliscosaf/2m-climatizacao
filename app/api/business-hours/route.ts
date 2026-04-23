export const dynamic = "force-dynamic"
// GET /api/business-hours — Retorna se o negócio está aberto agora
// Usa fuso horário de Salvador-BA (America/Bahia)
// Sem autenticação — dado público

import { NextResponse } from "next/server"
import { getBusinessHoursStatus } from "@/lib/business-hours"
import type { BusinessHoursStatus } from "@/lib/business-hours"

export async function GET() {
  const status: BusinessHoursStatus = getBusinessHoursStatus()

  return NextResponse.json(status, {
    // Cache de 1 minuto — suficiente para o badge; evita overhead
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
    },
  })
}
