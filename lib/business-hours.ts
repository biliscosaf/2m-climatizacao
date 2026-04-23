// Lógica de horário comercial — usada no badge "Aberto agora / Fechado"
// e na API GET /api/business-hours
// Horário padrão: Seg–Sáb 08:00–18:00, Dom fechado (PLACEHOLDER — cliente confirma)

// Dias da semana: 0 = Domingo, 1 = Segunda, ..., 6 = Sábado (não usados, mas deixados como referência)
// const SUNDAY = 0
// const SATURDAY = 6

const OPENING_HOUR = 8  // 08:00
const CLOSING_HOUR = 18 // 18:00

// Fuso horário de Salvador-BA (America/Bahia = UTC-3, sem horário de verão)
const TIMEZONE = "America/Bahia"

export interface BusinessHoursStatus {
  isOpen: boolean
  message: string
  openingTime: string  // ex: "08:00"
  closingTime: string  // ex: "18:00"
  timezone: string
}

/**
 * Retorna o status atual de funcionamento do negócio.
 * Usa o fuso horário de Salvador-BA (America/Bahia).
 */
export function getBusinessHoursStatus(): BusinessHoursStatus {
  const now = new Date()

  // Converter para fuso horário de Salvador usando Intl API
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: TIMEZONE,
    weekday: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  const parts = formatter.formatToParts(now)
  const weekday = parseInt(parts.find((p) => p.type === "weekday")?.value || "0", 10)
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10)
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10)

  // Aberto: Seg-Sáb (1-6) entre 08:00 e 18:00; Fechado: Dom (0)
  const isOpen = weekday !== 0 && (hour > OPENING_HOUR || (hour === OPENING_HOUR && minute >= 0)) && hour < CLOSING_HOUR

  const openingTime = `${String(OPENING_HOUR).padStart(2, "0")}:00`
  const closingTime = `${String(CLOSING_HOUR).padStart(2, "0")}:00`

  const message = isOpen
    ? "Aberto agora"
    : weekday === 0
      ? "Fechado no domingo"
      : hour >= CLOSING_HOUR
        ? `Abre amanhã às ${openingTime}`
        : `Abre às ${openingTime}`

  return {
    isOpen,
    message,
    openingTime,
    closingTime,
    timezone: TIMEZONE,
  }
}
