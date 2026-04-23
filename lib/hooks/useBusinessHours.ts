"use client"

// Hook para verificar horário comercial no client-side
// Faz fetch para /api/business-hours e retorna status atualizado

import { useState, useEffect } from "react"
import type { BusinessHoursStatus } from "@/lib/business-hours"

const REFRESH_INTERVAL_MS = 60_000 // Atualiza a cada 1 minuto

interface UseBusinessHoursReturn {
  status: BusinessHoursStatus | null
  isLoading: boolean
}

/**
 * Hook que consulta o endpoint /api/business-hours e retorna o status atual.
 * Atualiza automaticamente a cada minuto para manter o badge sincronizado.
 */
export function useBusinessHours(): UseBusinessHoursReturn {
  const [status, setStatus] = useState<BusinessHoursStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch("/api/business-hours", {
          cache: "no-store", // Sempre busca status atual
        })
        if (response.ok) {
          const data = (await response.json()) as BusinessHoursStatus
          setStatus(data)
        }
      } catch {
        // Falha silenciosa — badge simplesmente não aparece
      } finally {
        setIsLoading(false)
      }
    }

    void fetchStatus()

    const interval = setInterval(() => void fetchStatus(), REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  return { status, isLoading }
}
