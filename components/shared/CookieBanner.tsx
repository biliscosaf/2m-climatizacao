"use client"

// Cookie banner com opt-in granular (Essential/Functional/Analytics)
// Persiste no localStorage, respeita LGPD

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Info } from "lucide-react"

interface CookieConsent {
  essential: boolean // Sempre true (necessário para funcionar)
  functional: boolean
  analytics: boolean
}

const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  functional: false,
  analytics: false,
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT)
  const [expanded, setExpanded] = useState(false)

  // Verificar localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem("cookieConsent")
    if (!stored) {
      setShowBanner(true)
    } else {
      setConsent(JSON.parse(stored))
    }
  }, [])

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(consent))
    setShowBanner(false)
  }

  const handleAcceptAll = () => {
    const allConsent: CookieConsent = {
      essential: true,
      functional: true,
      analytics: true,
    }
    localStorage.setItem("cookieConsent", JSON.stringify(allConsent))
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const minimalConsent: CookieConsent = {
      essential: true,
      functional: false,
      analytics: false,
    }
    localStorage.setItem("cookieConsent", JSON.stringify(minimalConsent))
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-2xl"
        >
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 2xl:px-12">
            {/* Cabeçalho */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Nós respeito sua privacidade
                  </h3>
                  <p className="text-sm text-gray-600">
                    Usamos cookies para melhorar sua experiência. Veja nossa{" "}
                    <a
                      href="/politica-de-privacidade"
                      className="font-medium text-sky-600 hover:underline"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0 text-gray-500 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Detalhes expandíveis */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-4 space-y-3 border-t border-gray-200 pt-4"
                >
                  {/* Essential */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="essential"
                      checked={true}
                      disabled
                      className="h-4 w-4 rounded border-gray-300 accent-sky-500"
                    />
                    <label htmlFor="essential" className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        Cookies Essenciais
                      </span>
                      <span className="text-xs text-gray-600">
                        Necessários para o site funcionar (obrigatório)
                      </span>
                    </label>
                  </div>

                  {/* Functional */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="functional"
                      checked={consent.functional}
                      onChange={(e) =>
                        setConsent({
                          ...consent,
                          functional: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 accent-sky-500"
                    />
                    <label htmlFor="functional" className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        Cookies Funcionais
                      </span>
                      <span className="text-xs text-gray-600">
                        Preferências e lembrete de seus dados
                      </span>
                    </label>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="analytics"
                      checked={consent.analytics}
                      onChange={(e) =>
                        setConsent({
                          ...consent,
                          analytics: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 accent-sky-500"
                    />
                    <label htmlFor="analytics" className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        Analytics
                      </span>
                      <span className="text-xs text-gray-600">
                        Para melhorar nosso site com dados anônimos
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botões */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-left text-sm font-medium text-sky-600 transition-colors hover:text-sky-700"
              >
                {expanded ? "Menos opções" : "Personalizar"}
              </button>

              <div className="flex gap-3">
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Rejeitar
                </Button>
                {expanded && (
                  <Button
                    onClick={handleSavePreferences}
                    variant="secondary"
                    size="sm"
                    className="rounded-lg bg-sky-500 text-white hover:bg-sky-600"
                  >
                    Salvar preferências
                  </Button>
                )}
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="rounded-lg bg-orange-heat-500 text-white hover:bg-orange-heat-600"
                >
                  Aceitar tudo
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
