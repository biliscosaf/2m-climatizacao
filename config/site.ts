// Configuração de site — espelha content/site.ts mas focada em configs técnicas
// Separado para não misturar dados de conteúdo com configurações de ambiente

// Horário de funcionamento (usado em lib/business-hours.ts)
// Formato: { [diaSemana: number]: { open: number, close: number } | null }
// null = fechado no dia; number = hora em inteiro (8 = 08:00, 18 = 18:00)
export const BUSINESS_HOURS_CONFIG: Record<number, { open: number; close: number } | null> = {
  0: null,  // Domingo — fechado
  1: { open: 8, close: 18 }, // Segunda
  2: { open: 8, close: 18 }, // Terça
  3: { open: 8, close: 18 }, // Quarta
  4: { open: 8, close: 18 }, // Quinta
  5: { open: 8, close: 18 }, // Sexta
  6: { open: 8, close: 18 }, // Sábado
}

// Número de WhatsApp — lido do env em produção, fallback para dev
export const WHATSAPP_NUMBER =
  process.env.WHATSAPP_NUMBER ?? "5571999999999"

// Email para notificações de leads
export const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL ?? "contato@solucoes2m.com.br"

// URL pública do site
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

// CNPJ (placeholder — cliente preenche antes do go-live)
export const CNPJ = process.env.CNPJ ?? "00.000.000/0001-00"
