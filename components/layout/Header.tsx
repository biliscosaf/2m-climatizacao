// Header — navegação principal e logo
// Server Component por padrão

import { BusinessHoursBadge } from "@/components/shared/BusinessHoursBadge"
import { Button } from "@/components/ui/button"
import { getWhatsAppUrl } from "@/config/whatsapp"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo + Nome da empresa */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
              <span className="text-lg font-bold text-white">2M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-gray-900">2M Climatização</h1>
              <p className="text-xs text-gray-500">Salvador - BA</p>
            </div>
          </div>

          {/* Navegação + Badge de horário */}
          <div className="flex items-center gap-4">
            {/* Badge horário — visible em desktop */}
            <div className="hidden md:block">
              <BusinessHoursBadge />
            </div>

            {/* CTA */}
            <a href={getWhatsAppUrl()}>
              <Button
                size="sm"
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 md:px-6"
              >
                💬 Pedir orçamento
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
