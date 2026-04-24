// Seção Resultado Final — ambiente com ar-condicionado instalado
// Server Component com imagem aspiracional

import Image from "next/image"

export function AmbientResult() {
  return (
    <section className="bg-gradient-to-b from-white to-sky-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Conforto em Seu Ambiente
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Instalações perfeitas que se integram ao seu espaço
          </p>
        </div>

        {/* Grid de imagens — galeria */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Imagem 1 — Sala moderna */}
          <div className="group overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-64 w-full overflow-hidden bg-gray-200">
              <Image
                src="/images/ambiente/sala-moderna-ar.jpg"
                alt="Sala moderna com ar-condicionado instalado em Salvador"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay no hover */}
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </div>
            <div className="bg-white p-4">
              <h3 className="font-semibold text-gray-900">Integração Perfeita</h3>
              <p className="text-sm text-gray-600">Design discreto que combina com qualquer décor</p>
            </div>
          </div>

          {/* Imagem 2 — Quarto aconchego */}
          <div className="group overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-64 w-full overflow-hidden bg-gray-200">
              <Image
                src="/images/ambiente/quarto-ar-instalado.jpg"
                alt="Quarto confortável com ar-condicionado instalado"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </div>
            <div className="bg-white p-4">
              <h3 className="font-semibold text-gray-900">Silencioso e Eficiente</h3>
              <p className="text-sm text-gray-600">Durma tranquilo com clima perfeito</p>
            </div>
          </div>

          {/* Imagem 3 — Escritório/Home Office */}
          <div className="group overflow-hidden rounded-2xl shadow-lg md:col-span-2 lg:col-span-1">
            <div className="relative h-64 w-full overflow-hidden bg-gray-200">
              <Image
                src="/images/ambiente/escritorio-ar.jpg"
                alt="Escritório com ar-condicionado para máximo conforto no trabalho"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </div>
            <div className="bg-white p-4">
              <h3 className="font-semibold text-gray-900">Produtividade Garantida</h3>
              <p className="text-sm text-gray-600">Temperatura ideal para trabalhar melhor</p>
            </div>
          </div>
        </div>

        {/* Destaque */}
        <div className="mt-12 rounded-2xl bg-blue-gradient p-8 text-center md:p-12">
          <h3 className="mb-4 text-2xl font-bold text-white">
            Você também merece esse conforto
          </h3>
          <p className="mb-6 text-white/90">
            Instalação profissional, garantia completa e preço justo
          </p>
        </div>
      </div>
    </section>
  )
}
