// Integração com Resend para notificação de novos leads por email
// O técnico recebe um email a cada lead capturado com os dados do quiz
// Documentação Resend: https://resend.com/docs

import type { LeadInput } from "@/lib/validation"

// Labels amigáveis para o email de notificação
const LABELS: Record<string, Record<string, string>> = {
  problema: {
    "cheiro-ruim": "Cheiro ruim / ar sujo",
    "nao-resfria": "Parou de funcionar / resfria mal",
    instalacao: "Instalação de novo equipamento",
    manutencao: "Manutenção preventiva",
  },
  local: {
    quarto: "Quarto (residencial)",
    sala: "Sala (residencial)",
    cozinha: "Cozinha / área de serviço",
    escritorio: "Escritório / comércio",
    outro: "Outro",
  },
  equipamento: {
    "nao-sei": "Não sabe a potência",
    "9000": "9.000 BTUs",
    "12000": "12.000 BTUs",
    "18000": "18.000 BTUs",
    "24000+": "24.000 BTUs ou mais",
  },
  urgencia: {
    hoje: "HOJE (urgente)",
    "esta-semana": "Essa semana",
    "duas-semanas": "Nas próximas 2 semanas",
    pesquisando: "Ainda pesquisando (lead frio)",
  },
}

/**
 * Envia email de notificação para o técnico quando um novo lead é capturado.
 * Só executa se RESEND_API_KEY estiver configurado.
 */
export async function sendLeadNotificationEmail(
  lead: LeadInput & { id: string }
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL ?? "contato@solucoes2m.com.br"

  if (!apiKey || apiKey === "re_XXXXX") {
    console.warn(
      "[email.ts] RESEND_API_KEY não configurada. " +
        "Email de notificação não enviado."
    )
    return
  }

  // TODO: backend-developer pode usar o SDK Resend ao invés de fetch direto
  // import { Resend } from 'resend'
  // const resend = new Resend(apiKey)

  const urgenciaLabel = LABELS.urgencia[lead.urgencia] ?? lead.urgencia
  const problemaLabel = LABELS.problema[lead.problema] ?? lead.problema
  const isUrgent = lead.urgencia === "hoje"

  const subject = isUrgent
    ? `URGENTE — Novo lead: ${lead.nome} (${lead.bairro})`
    : `Novo lead: ${lead.nome} — ${problemaLabel}`

  const htmlBody = `
    <h2>Novo lead capturado via quiz — Soluções 2M Climatização</h2>

    <table cellpadding="8" border="1" style="border-collapse: collapse;">
      <tr><td><strong>ID</strong></td><td>${lead.id}</td></tr>
      <tr><td><strong>Nome</strong></td><td>${lead.nome}</td></tr>
      <tr><td><strong>WhatsApp</strong></td><td>${lead.whatsapp}</td></tr>
      <tr><td><strong>Bairro</strong></td><td>${lead.bairro}</td></tr>
      <tr><td><strong>Problema</strong></td><td>${problemaLabel}</td></tr>
      <tr><td><strong>Local</strong></td><td>${LABELS.local[lead.local] ?? lead.local}</td></tr>
      <tr><td><strong>Equipamento</strong></td><td>${LABELS.equipamento[lead.equipamento] ?? lead.equipamento}</td></tr>
      <tr><td><strong>Urgência</strong></td><td>${urgenciaLabel}</td></tr>
    </table>

    <p>
      <a href="https://wa.me/${process.env.WHATSAPP_NUMBER ?? "5571999999999"}">
        Responder via WhatsApp
      </a>
    </p>

    <p style="color: #666; font-size: 12px;">
      Este email foi enviado automaticamente pelo sistema de captação de leads da Soluções 2M Climatização.
    </p>
  `

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "leads@solucoes2m.com.br",
        to: notificationEmail,
        subject,
        html: htmlBody,
      }),
    })

    if (!response.ok) {
      console.error("[email.ts] Erro ao enviar email via Resend:", response.status)
    }
  } catch (error) {
    // Não propagar — falha no email não deve quebrar o fluxo do lead
    console.error("[email.ts] Falha ao enviar notificação por email:", error)
  }
}
