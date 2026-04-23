import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Workaround para bug do Next.js no Windows
  generateBuildId: async () => {
    return new Date().getTime().toString()
  },

  // Modo estrito do React — detecta problemas de ciclo de vida e efeitos colaterais
  reactStrictMode: true,

  // Headers de segurança obrigatórios (OWASP / LGPD)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Previne clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Previne sniffing de MIME type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controla informações enviadas no Referer
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissões de browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // HSTS — força HTTPS por 1 ano
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Content Security Policy — será refinado pelo security-lgpd
          // TODO: security-lgpd deve restringir os valores abaixo antes do go-live
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*.openstreetmap.org https://*.tile.openstreetmap.org",
              "font-src 'self'",
              "connect-src 'self' https://graph.facebook.com https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ]
  },

  // Domínios permitidos para next/image
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Bloquear crawlers de /api no robots.txt é feito via app/robots.ts
}

export default nextConfig
