"use client"

// Conteúdo do mapa Leaflet — separado para import dinâmico
// Importa Leaflet apenas quando necessário (client-side)

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { AREAS_ATENDIMENTO, SALVADOR_CENTER } from "@/config/areas"

// Fix para ícones do Leaflet
const icon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
})

export function MapContent() {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // Inicializar mapa
    const map = L.map(containerRef.current).setView(
      [SALVADOR_CENTER.lat, SALVADOR_CENTER.lng],
      SALVADOR_CENTER.zoom
    )

    // Layer OSM
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Adicionar markers dos bairros
    AREAS_ATENDIMENTO.forEach((area) => {
      if (!area.lat || !area.lng) return

      const markerColor =
        area.grupo === "regiao-metropolitana" ? "#F97316" : "#0EA5E9"
      const customIcon = L.icon({
        iconUrl: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(markerColor)}" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      })

      const marker = L.marker([area.lat, area.lng], { icon: customIcon }).addTo(
        map
      )

      const popupText =
        area.taxaDeslocamento > 0
          ? `<strong>${area.nome}</strong><br/>Taxa: R$ ${area.taxaDeslocamento}`
          : `<strong>${area.nome}</strong><br/>Sem taxa`

      marker.bindPopup(popupText)
    })

    // Adicionar legenda
    const legend = L.control({ position: "bottomright" })
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend")
      div.style.backgroundColor = "white"
      div.style.padding = "10px"
      div.style.borderRadius = "5px"
      div.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)"
      div.innerHTML = `
        <div style="font-size: 12px;">
          <div><span style="display:inline-block;width:12px;height:12px;background:#0EA5E9;border-radius:50%;margin-right:5px;"></span>Salvador</div>
          <div><span style="display:inline-block;width:12px;height:12px;background:#F97316;border-radius:50%;margin-right:5px;"></span>Região Metro</div>
        </div>
      `
      return div
    }
    legend.addTo(map)

    mapRef.current = map

    // Cleanup
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return <div ref={containerRef} style={{ width: "100%", height: "400px" }} />
}
