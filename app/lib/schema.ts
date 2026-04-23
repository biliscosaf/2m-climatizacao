// Schema.org estruturado para SEO
// Implementa: LocalBusiness, Service, FAQPage, AggregateRating
// Validar em: https://schema.org/validator

import { SITE_URL, WHATSAPP_NUMBER, CNPJ } from "@/config/site"
import { SERVICES } from "@/content/services"
import { FAQ_ITEMS } from "@/content/faq"

/**
 * LocalBusiness schema — informações gerais da empresa
 * Usado em: /
 */
export function generateLocalBusinessSchema() {
  // Sanitizar número WhatsApp (remover caracteres não-numéricos)
  const cleanNumber = WHATSAPP_NUMBER ? WHATSAPP_NUMBER.replace(/\D/g, "") : "1199999999"

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: "Soluções 2M Climatização",
    url: SITE_URL,
    telephone: `+55${cleanNumber}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua a Definir, 123", // [PLACEHOLDER — cliente preenche]
      addressLocality: "Salvador",
      addressRegion: "BA",
      postalCode: "40000-000", // [PLACEHOLDER]
      addressCountry: "BR",
    },
    description:
      "Instalação, manutenção, limpeza, reparo e higienização profissional de " +
      "ar-condicionado em Salvador e região. 15+ anos de experiência.",
    image: `${SITE_URL}/logo.svg`,
    sameAs: [
      "https://facebook.com/solucoes2m", // [PLACEHOLDER]
      "https://instagram.com/solucoes2m", // [PLACEHOLDER]
    ],
    priceRange: "R$100-2000",
    areaServed: {
      "@type": "City",
      name: "Salvador",
      "@id": "https://pt.wikipedia.org/wiki/Salvador_(Bahia)",
    },
    // Horário de funcionamento
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "CLOSED",
      },
    ],
    // Avaliação agregada (fake — cliente atualiza com dados reais)
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    contact: [
      {
        "@type": "ContactPoint",
        contactType: "Sales",
        telephone: `+55${cleanNumber}`,
        areaServed: ["BR"],
        availableLanguage: "pt-BR",
      },
    ],
  }
}

/**
 * Service schema — cada serviço oferecido
 * Usado em: página principal (em script tag)
 */
export function generateServiceSchemas() {
  return SERVICES.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Soluções 2M Climatização",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Salvador, BA",
    },
    // Preço aproximado (range)
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      priceRange: "R$100-2000", // Valor genérico
    },
    serviceType: service.title,
    // Rating herdado do LocalBusiness
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "47",
    },
  }))
}

/**
 * FAQPage schema — para integração com Google Search (People Also Ask)
 * Usado em: página principal (em script tag)
 */
export function generateFAQPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  }
}

/**
 * AggregateRating schema — avaliação agregada (prova social)
 * Usado em: depoimentos / página principal
 */
export function generateAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    name: "Soluções 2M Climatização",
    ratingValue: "4.9",
    ratingCount: "47",
    bestRating: "5",
    worstRating: "1",
    author: {
      "@type": "LocalBusiness",
      name: "Soluções 2M Climatização",
    },
  }
}

/**
 * WebSite schema — melhor indexação do site como um todo
 * Usado em: layout raiz (app/layout.tsx)
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: "Soluções 2M Climatização",
    description:
      "Instalação, manutenção, limpeza, reparo e higienização de ar-condicionado em Salvador-BA",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * BreadcrumbList schema — navegação estruturada
 * Usado em: páginas com múltiplos níveis (política, termos)
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Organization schema — identidade corporativa
 * Usado em: footer, meta tags
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: SITE_URL,
    name: "Soluções 2M Climatização",
    description:
      "Empresa especializada em ar-condicionado em Salvador. " +
      "Instalação, manutenção, limpeza, reparo.",
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [
      "https://facebook.com/solucoes2m",
      "https://instagram.com/solucoes2m",
    ],
    // CNPJ (brasileirice)
    identifier: CNPJ,
    // Contatos
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: `+55${WHATSAPP_NUMBER ? WHATSAPP_NUMBER.replace(/\D/g, "") : "1199999999"}`,
      availableLanguage: "pt-BR",
    },
    // Localização
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "BA",
      addressLocality: "Salvador",
    },
  }
}

/**
 * Product schema (opcional) — para cada equipamento específico que instala
 * Usado em: seção de serviços (se quiser estruturar produtos)
 */
export function generateProductSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    manufacturer: {
      "@type": "Organization",
      name: "Soluções 2M Climatização",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "47",
    },
  }
}
