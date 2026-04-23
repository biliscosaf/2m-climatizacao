"use client"

// Botão flutuante WhatsApp — fixo no canto inferior direito
// Client Component para interatividade

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

const pulseVariants = {
  pulse: {
    boxShadow: [
      "0 0 0 0 rgba(34, 197, 94, 0.7)",
      "0 0 0 10px rgba(34, 197, 94, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
}

export function WhatsAppButton() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Número da empresa
  const whatsappNumber = "5571999999999" // Substitua pelo número real
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços.`

  return (
    <>
      {/* Botão flutuante */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all hover:bg-emerald-600 hover:shadow-xl md:h-16 md:w-16"
        variants={pulseVariants}
        animate="pulse"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
      </motion.a>

      {/* Label informativo (desktop) */}
      {!isMobile && (
        <motion.div
          className="fixed bottom-24 right-6 z-40 rounded-lg bg-white px-4 py-2 shadow-lg"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="whitespace-nowrap text-sm font-medium text-gray-900">
            Fale conosco! 👋
          </p>
          <p className="text-xs text-gray-600">Responderemos em segundos</p>
        </motion.div>
      )}
    </>
  )
}
