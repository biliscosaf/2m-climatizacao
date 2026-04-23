// Lógica de horário comercial — usada no badge "Aberto agora / Fechado"
// e na API GET /api/business-hours
// Horário padrão: Seg–Sáb 08:00–18:00, Dom fechado (PLACEHOLDER — cliente confirma)

// Dias da semana: 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
const BUSINESS_DAYS = {
  SUNDAY: 0,
  SATURDAY: 6,
} as const

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

  // Obtém hora e dia da semana no fuso de Salvador
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: TIMEZONE,
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    hour12: false,
  })

  const parts = formatter.formatToParts(now)
  const hourPart = parts.find((p) => p.type === "hour")
  const minutePart = parts.find((p) => p.type === "minute")

  const currentHour = parseInt(hourPart?.value ?? "0", 10)
  const currentMinute = parseInt(minutePart?.value ?? "0", 10)
  const dayOfWeek = now.toLocaleDateString("pt-BR", {
    timeZone: TIMEZONE,
    weekday: "short",
  })

  // Domingo = fechado
  const isSunday = dayOfWeek.toLowerCase().startsWith("dom")

  // Verifica se está dentro do horário comercial
  const isWithinHours =
    (currentHour > OPENING_HOUR ||
      (currentHour === OPENING_HOUR && currentMinute >= 0)) &&
    currentHour < CLOSING_HOUR

  const isOpen = !isSunday && isWithinHours

  return {
    isOpen,
    message: isOpen
      ? "Aberto agora — respondemos em minutos"
      : `Fechado agora — abrimos às ${OPENING_HOUR}h`,
    openingTime: `${String(OPENING_HOUR).padStart(2, "0")}:00`,
    closingTime: `${String(CLOSING_HOUR).padStart(2, "0")}:00`,
    timezone: TIMEZONE,
  }
}
