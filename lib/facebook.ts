// Integração com Facebook Conversions API (server-side)
// Envia evento "Lead" para deduplicação com o Facebook Pixel (client-side)
// Documentação: https://developers.facebook.com/docs/marketing-api/conversions-api

import type { LeadInput } from "@/lib/validation"

const FB_API_VERSION = "v19.0"
const FB_EVENTS_ENDPOINT = `https://graph.facebook.com/${FB_API_VERSION}`

interface FacebookEventData {
  event_name: string
  event_time: number
  event_id: string           // Para deduplicação com o Pixel client-side
  action_source: "website"
  user_data: {
    ph?: string[]            // Phone (hash SHA-256 do WhatsApp)
    fn?: string[]            // First name (hash SHA-256)
    ct?: string[]            // City (hash SHA-256)
    country?: string[]       // Country (hash SHA-256)
  }
  custom_data?: {
    content_category?: string
    content_name?: string
  }
}

/**
 * Envia evento "Lead" para a Conversions API do Facebook.
 * Chamado no servidor após salvar o lead no banco de dados.
 * Só executa se FB_CONVERSIONS_API_TOKEN estiver configurado.
 *
 * Os dados pessoais (whatsapp, bairro) são hasheados com SHA-256 conforme
 * exigido pela API do Facebook para garantir privacidade (LGPD-compliant).
 */
export async function sendFacebookLeadEvent(
  lead: LeadInput,
  pixelId: string,
  eventId: string // mesmo event_id gerado no client pelo Pixel
): Promise<void> {
  const token = process.env.FB_CONVERSIONS_API_TOKEN

  // Não falha silenciosamente — loga aviso mas não quebra o fluxo principal
  if (!token || token === "TOKEN_AQUI") {
    console.warn(
      "[facebook.ts] FB_CONVERSIONS_API_TOKEN não configurado. " +
        "Evento Lead não enviado para Conversions API."
    )
    return
  }

  try {
    // Calcula hashes SHA-256 para anonimização de dados pessoais
    const phoneHash = await hashSHA256(lead.whatsapp)
    const cityHash = await hashSHA256(lead.bairro)
    const countryHash = await hashSHA256("br")

    const eventData: FacebookEventData = {
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      user_data: {
        ph: [phoneHash], // Phone hasheado
        ct: [cityHash], // Cidade/bairro hasheado
        country: [countryHash], // País hasheado
      },
      custom_data: {
        content_category: lead.problema,
        content_name: `Quiz - ${lead.problema} - ${lead.urgencia}`,
      },
    }

    const response = await fetch(
      `${FB_EVENTS_ENDPOINT}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [eventData] }),
      }
    )

    if (!response.ok) {
      console.error(
        "[facebook.ts] Erro ao enviar evento para Conversions API:",
        response.status
      )
    }
  } catch (error) {
    // Não propagar o erro — falha na API do Facebook não deve quebrar o lead
    console.error("[facebook.ts] Falha na Conversions API:", error)
  }
}

/**
 * Hash SHA-256 de um valor string (para anonimização de dados pessoais).
 * Obrigatório pela API do Facebook para envio de dados de usuário.
 */
async function hashSHA256(value: string): Promise<string> {
  const normalized = value.toLowerCase().trim()
  const encoder = new TextEncoder()
  const data = encoder.encode(normalized)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}
