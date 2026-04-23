// Copy refinada das seções principais (exceto Hero, About, Footer, Quiz)
// Tone: Técnico mas acessível, benefícios claros, CTAs ação-oriented

export const SECTIONS_TEXT = {
  // =========================================================
  // SEÇÃO: SERVIÇOS (Services)
  // =========================================================
  services: {
    sectionTitle: "Nossos Serviços",
    sectionSubtitle:
      "6 especializações para deixar seu ar-condicionado funcionando perfeitamente",

    services: [
      {
        id: "instalacao",
        title: "Instalação de Equipamento",
        description:
          "Instalamos splits, janelas, cassetes e sistemas centrais. " +
          "Garantia de 24 meses no equipamento + 90 dias no serviço.",
        cta: "Quero orçamento de instalação",
      },
      {
        id: "limpeza",
        title: "Limpeza Técnica",
        description:
          "Limpeza profunda de filtros e serpentinas. " +
          "Seu ar gela mais rápido e consome menos energia. Recomendada a cada 6 meses.",
        cta: "Solicitar limpeza técnica",
      },
      {
        id: "manutencao",
        title: "Manutenção Preventiva",
        description:
          "Revisão completa para evitar problemas no futuro. " +
          "Testamos todos os componentes e fazemos ajustes necessários.",
        cta: "Agendar manutenção",
      },
      {
        id: "reparo",
        title: "Reparo de Emergência",
        description:
          "Seu ar parou? Não problema. Atendemos urgências com diagnóstico " +
          "no local e solução rápida. Muitas vezes resolvemos no mesmo dia.",
        cta: "Chamar técnico agora",
      },
      {
        id: "recarga-gas",
        title: "Recarga de Gás Refrigerante",
        description:
          "Seu ar não gela como antes? Pode ser falta de gás. " +
          "Fazemos recarga com equipamentos calibrados e materiais homologados.",
        cta: "Solicitar recarga",
      },
      {
        id: "higienizacao",
        title: "Higienização Profunda",
        description:
          "Limpeza com produtos bactericidas e fungicidas que eliminam fungos, " +
          "bactérias e ácaros. Ideal para quem tem alergia ou asma.",
        cta: "Agendar higienização",
      },
    ],
  },

  // =========================================================
  // SEÇÃO: ANTES/DEPOIS (BeforeAfter)
  // =========================================================
  beforeAfter: {
    sectionTitle: "Antes vs Depois",
    sectionSubtitle: "Nosso trabalho fala por si — veja a transformação",
    cta: "Quer o seu assim também?",
  },

  // =========================================================
  // SEÇÃO: PROVA SOCIAL (Testimonials)
  // =========================================================
  testimonials: {
    sectionTitle: "O que nossos clientes dizem",
    sectionSubtitle:
      "Resultado real de quem confiou na Soluções 2M em Salvador",
    cta: "Deixe seu depoimento após usar nosso serviço",
  },

  // =========================================================
  // SEÇÃO: MAPA (Coverage Map)
  // =========================================================
  coverageMap: {
    sectionTitle: "Onde atendemos em Salvador",
    sectionSubtitle: "Cobertura rápida em mais de 25 bairros da capital",
    fora_cobertura:
      "Seu bairro não está na lista? Sem problema — entre em contato via WhatsApp. " +
      "Podemos atender fora dessa área com possível taxa adicional de deslocamento.",
  },

  // =========================================================
  // SEÇÃO: FAQ (Perguntas Frequentes)
  // =========================================================
  faq: {
    sectionTitle: "Dúvidas Frequentes",
    sectionSubtitle: "Respostas diretas às perguntas mais comuns",
  },

  // =========================================================
  // SEÇÃO: CTA FINAL (Call-to-Action ao final da página)
  // =========================================================
  ctaFinal: {
    sectionTitle: "Pronto para ar frio novamente?",
    sectionSubtitle:
      "Responda 5 perguntas rápidas e receba sua estimativa de preço. " +
      "Depois é só nos chamar no WhatsApp.",
    ctaLabel: "Começar o Quiz",
    ctaDescription: "2 minutos para descobrir sua solução",
  },
}
