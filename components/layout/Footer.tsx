// Footer — links, informações de contato, policy links
// Server Component

import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 2xl:px-12">
        {/* Grid de conteúdo */}
        <div className="grid gap-8 md:grid-cols-4">
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
            <h4 className="mb-4 font-semibold text-white">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>(71) 9 9999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <a href="mailto:contato@2m.com.br" className="hover:text-white">
                  contato@2m.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Salvador - BA</span>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Horário */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-sm">
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
            <p className="mt-3 text-xs text-gray-400">
              Emergências: consulte via WhatsApp
            </p>
          </div>

          {/* Coluna 4 — Links úteis */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Links Úteis</h4>
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
