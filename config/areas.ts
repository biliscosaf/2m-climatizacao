// Bairros e regiões de atendimento — PLACEHOLDERS
// Cliente confirma a lista real antes do go-live
// Veja docs/manual-cliente.md para instruções

export interface Area {
  nome: string
  grupo: "salvador-central" | "salvador-periferia" | "regiao-metropolitana" | "fora-area"
  taxaDeslocamento: number  // Em reais (0 = sem taxa, -1 = verificar disponibilidade)
  lat?: number              // Para o mapa Leaflet
  lng?: number
}

// Coordenadas centrais de Salvador para o mapa
export const SALVADOR_CENTER = {
  lat: -12.9718,
  lng: -38.5011,
  zoom: 12,
}

// Lista de bairros [PLACEHOLDER — 15 bairros populares de Salvador]
// Cliente deve substituir pela lista real de atendimento
export const AREAS_ATENDIMENTO: Area[] = [
  // Salvador — central (sem taxa de deslocamento)
  { nome: "Barra", grupo: "salvador-central", taxaDeslocamento: 0, lat: -13.0076, lng: -38.5356 },
  { nome: "Ondina", grupo: "salvador-central", taxaDeslocamento: 0, lat: -13.0019, lng: -38.5166 },
  { nome: "Pituba", grupo: "salvador-central", taxaDeslocamento: 0, lat: -12.9869, lng: -38.4583 },
  { nome: "Graça", grupo: "salvador-central", taxaDeslocamento: 0, lat: -12.9900, lng: -38.5156 },
  { nome: "Vitória", grupo: "salvador-central", taxaDeslocamento: 0, lat: -12.9882, lng: -38.5039 },
  { nome: "Rio Vermelho", grupo: "salvador-central", taxaDeslocamento: 0, lat: -12.9955, lng: -38.4881 },
  { nome: "Amaralina", grupo: "salvador-central", taxaDeslocamento: 0, lat: -13.0000, lng: -38.4747 },

  // Salvador — periferia (pode ter taxa)
  { nome: "Cajazeiras", grupo: "salvador-periferia", taxaDeslocamento: 0, lat: -12.8936, lng: -38.4000 },
  { nome: "Nordeste de Amaralina", grupo: "salvador-periferia", taxaDeslocamento: 0, lat: -13.0048, lng: -38.4687 },
  { nome: "Pau da Lima", grupo: "salvador-periferia", taxaDeslocamento: 0, lat: -12.8950, lng: -38.4100 },

  // Região metropolitana (taxa de deslocamento — verificar com cliente)
  { nome: "Lauro de Freitas", grupo: "regiao-metropolitana", taxaDeslocamento: 30, lat: -12.8975, lng: -38.3249 },
  { nome: "Camaçari", grupo: "regiao-metropolitana", taxaDeslocamento: 50, lat: -12.6997, lng: -38.3243 },
  { nome: "Simões Filho", grupo: "regiao-metropolitana", taxaDeslocamento: 40, lat: -12.7863, lng: -38.4022 },
  { nome: "Dias d'Ávila", grupo: "regiao-metropolitana", taxaDeslocamento: 60, lat: -12.6111, lng: -38.2934 },
]

// Bairros disponíveis para o quiz (Q5) — lista simplificada para o select
export const BAIRROS_QUIZ = AREAS_ATENDIMENTO.map((a) => a.nome).sort()

// Adiciona opção "Outro" ao final
export const BAIRROS_QUIZ_COM_OUTRO = [...BAIRROS_QUIZ, "Outro"]
