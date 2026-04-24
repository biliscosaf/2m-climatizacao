// Footer — links, informações de contato, policy links
// Server Component

import { MessageCircle, Phone, MapPin, Clock } from "lucide-react"
import { getWhatsAppUrl } from "@/config/whatsapp"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 2xl:px-12">
        {/* CTA WhatsApp destaque */}
        <div className="mb-12 rounded-2xl bg-emerald-600 p-8 text-center md:p-10">
          <div className="flex justify-center gap-2 mb-4">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-white">Chamar no WhatsApp agora</h3>
          <p className="mb-6 text-emerald-100">
            Atendimento rápido. Orçamento grátis. Sem compromisso.
          </p>
          <a href={getWhatsAppUrl()}>
            <Button
              size="lg"
              className="rounded-full bg-white px-8 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              💬 Conversar agora
            </Button>
          </a>
        </div>

        {/* Grid de conteúdo */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Coluna 1 — Empresa */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-sky-500">
                <span className="text-sm font-bold text-white">2M</span>
              </div>
              <h3 className="font-semibold text-white">2M Climatização</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Soluções completas em ar-condicionado para Salvador e região metropolitana.
              Qualidade, rapidez e garantia em todos os serviços.
            </p>
          </div>

          {/* Coluna 2 — Contato */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Contato Principal</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                <a href={getWhatsAppUrl()} className="hover:text-white transition-colors">
                  WhatsApp — Resposta rápida ✓
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>(71) 9 9999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Salvador - BA</span>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Horário + Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Seg-Sex: 8h às 18h</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Sábado: 8h às 16h</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Domingo: Fechado</span>
              </li>
            </ul>
            <h4 className="mb-3 font-semibold text-white">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#servicos" className="hover:text-white">
                  Serviços
                </a>
              </li>
              <li>
                <a href="/#sobre" className="hover:text-white">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="/politica-de-privacidade" className="hover:text-white">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/termos-de-uso" className="hover:text-white">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="my-8 border-t border-gray-800" />

        {/* Bottom footer */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} 2M Climatização. Todos os direitos reservados.
          </p>

          {/* Badges/info */}
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-xs">
              ✓ LGPD Compliant
            </span>
            <span className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-xs">
              ✓ SSL Seguro
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
