// Utilitários para geração do link WhatsApp pré-preenchido
// Formato: https://wa.me/5571XXXXXXXX?text=mensagem+encodada
// Testado em iOS Safari e Android Chrome conforme especificado no briefing

import type { LeadInput } from "@/lib/validation"

// Mapeamentos de labels amigáveis para uso na mensagem
const LABELS_PROBLEMA: Record<string, string> = {
  "cheiro-ruim": "está com cheiro ruim ou sujo",
  "nao-resfria": "parou de funcionar ou resfria mal",
  instalacao: "quero instalar um equipamento novo",
  manutencao: "quero fazer manutenção preventiva",
}

const LABELS_LOCAL: Record<string, string> = {
  quarto: "quarto",
  sala: "sala",
  cozinha: "cozinha/área de serviço",
  escritorio: "escritório/comércio",
  outro: "outro ambiente",
}

const LABELS_EQUIPAMENTO: Record<string, string> = {
  "nao-sei": "não sabe a potência",
  "9000": "9.000 BTUs",
  "12000": "12.000 BTUs",
  "18000": "18.000 BTUs",
  "24000+": "24.000 BTUs ou mais",
}

const LABELS_URGENCIA: Record<string, string> = {
  hoje: "hoje mesmo",
  "esta-semana": "essa semana",
  "duas-semanas": "nas próximas 2 semanas",
  pesquisando: "ainda estou pesquisando",
}

/**
 * Gera a mensagem pré-preenchida para o WhatsApp com base nas respostas do quiz.
 * Formato humano, em português, contextualizado para a persona.
 */
export function buildWhatsAppMessage(lead: LeadInput): string {
  const problema = LABELS_PROBLEMA[lead.problema] ?? lead.problema
  const local = LABELS_LOCAL[lead.local] ?? lead.local
  const equipamento = LABELS_EQUIPAMENTO[lead.equipamento] ?? lead.equipamento
  const urgencia = LABELS_URGENCIA[lead.urgencia] ?? lead.urgencia

  return (
    `Olá! Fiz o quiz no site e gostaria de um orçamento. ` +
    `Meu ar-condicionado ${problema}. ` +
    `O equipamento fica na ${local}. ` +
    `A potência é: ${equipamento}. ` +
    `Preciso de atendimento ${urgencia}. ` +
    `Moro em ${lead.bairro}. ` +
    `Meu nome é ${lead.nome}.`
  )
}

/**
 * Gera o link wa.me completo para redirecionamento após conclusão do quiz.
 * Usa https://wa.me/ (não whatsapp://) para compatibilidade com iOS Safari.
 */
export function buildWhatsAppUrl(lead: LeadInput): string {
  const number = process.env.WHATSAPP_NUMBER ?? "5571999999999"
  const message = buildWhatsAppMessage(lead)
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encoded}`
}
