// Configuração central do WhatsApp para 2M Climatização
// Use essa constante em todos os links de WhatsApp

export const WHATSAPP_CONFIG = {
  number: "71999999999", // Seu número aqui (com código de país e DDD)
  defaultMessage: "Olá! Vim pelo site da 2M Climatização e gostaria de solicitar um orçamento.",
  serviceMessages: {
    instalacao: "Olá! Gostaria de solicitar um orçamento para Instalação de Ar-Condicionado.",
    limpeza: "Olá! Gostaria de solicitar um orçamento para Limpeza Técnica de Ar-Condicionado.",
    manutencao: "Olá! Gostaria de solicitar um orçamento para Manutenção Preventiva de Ar-Condicionado.",
    reparo: "Olá! Meu ar-condicionado parou de funcionar. Gostaria de solicitar um reparo urgente.",
    recargaGas: "Olá! Gostaria de solicitar um orçamento para Recarga de Gás Refrigerante.",
    higienizacao: "Olá! Gostaria de solicitar um orçamento para Higienização Profunda de Ar-Condicionado.",
  },
}

// Função helper para gerar URL do WhatsApp
export function getWhatsAppUrl(message: string = WHATSAPP_CONFIG.defaultMessage): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`
}

// Função para obter mensagem de serviço
export function getServiceMessage(serviceId: string): string {
  return (
    (WHATSAPP_CONFIG.serviceMessages as Record<string, string>)[serviceId] ||
    WHATSAPP_CONFIG.defaultMessage
  )
}
