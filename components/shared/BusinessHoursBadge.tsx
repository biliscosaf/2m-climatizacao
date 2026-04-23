"use client"

// Badge de horário comercial — "Aberto agora" ou "Fechado"
// Client Component — atualiza dinamicamente

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface BusinessStatus {
  isOpen: boolean
  message: string
  nextUpdate: string
}

// Horário comercial: seg-sab 8h-18h (Salvador - America/Bahia)
const BUSINESS_HOURS = {
  start: 8, // 8h
  end: 18, // 18h
  daysOpen: [1, 2, 3, 4, 5, 6], // seg=1, dom=0, sab=6
}

function getBusinessStatus(): BusinessStatus {
  const now = new Date()

  // Ajustar para fuso de Salvador (America/Bahia)
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Bahia",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  })

  const parts = formatter.formatToParts(now)
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10)
  const dayOfWeek = now.getDay() // 0=domingo, 6=sábado

  const isOpen =
    BUSINESS_HOURS.daysOpen.includes(dayOfWeek) &&
    hour >= BUSINESS_HOURS.start &&
    hour < BUSINESS_HOURS.end

  const message = isOpen
    ? "Aberto agora"
    : hour < BUSINESS_HOURS.start
      ? `Abrimos às ${BUSINESS_HOURS.start}h`
      : "Fechado agora"

  const nextUpdate = formatter.format(now)

  return { isOpen, message, nextUpdate }
}

export function BusinessHoursBadge() {
  const [status, setStatus] = useState<BusinessStatus>({
    isOpen: false,
    message: "Carregando...",
    nextUpdate: "",
  })

  useEffect(() => {
    // Atualizar status imediatamente e a cada minuto
    setStatus(getBusinessStatus())

    const interval = setInterval(() => {
      setStatus(getBusinessStatus())
    }, 60000) // A cada minuto

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className={`
        flex items-center gap-2 rounded-full px-4 py-2
        ${
          status.isOpen
            ? "bg-emerald-50"
            : "bg-neutral-100"
        }
      `}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ícone de clock com pulso */}
      <motion.div
        animate={status.isOpen ? { scale: [1, 1.2, 1] } : {}}
        transition={status.isOpen ? { duration: 2, repeat: Infinity } : {}}
      >
        <Clock
          className={`h-4 w-4 ${
            status.isOpen ? "text-emerald-600" : "text-gray-600"
          }`}
        />
      </motion.div>

      {/* Texto */}
      <span
        className={`text-xs font-semibold ${
          status.isOpen ? "text-emerald-700" : "text-gray-700"
        }`}
      >
        {status.message}
      </span>
    </motion.div>
  )
}
